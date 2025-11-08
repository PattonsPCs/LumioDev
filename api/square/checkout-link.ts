import type { VercelRequest, VercelResponse } from "@vercel/node";
import { randomUUID } from "crypto";
import { SquareClient, SquareEnvironment, Square, SquareError } from "square";

// Product catalog - inlined from server/products.ts
interface ProductDefinition {
  id: string;
  name: string;
  price: number;
}

const productCatalog: Record<string, ProductDefinition> = {
  "1": {
    id: "1",
    name: "Sunshine Hoodie",
    price: 89,
  },
  "2": {
    id: "2",
    name: "Coral Breeze Hoodie",
    price: 89,
  },
  "3": {
    id: "3",
    name: "Sandy Beach Hoodie",
    price: 89,
  },
  "4": {
    id: "4",
    name: "Golden Hour Hoodie",
    price: 95,
  },
  "5": {
    id: "5",
    name: "Sunset Coral Hoodie",
    price: 95,
  },
  "6": {
    id: "6",
    name: "Island Sand Hoodie",
    price: 95,
  },
};

function getProductById(id: string): ProductDefinition | undefined {
  return productCatalog[id];
}

// Square client setup - inlined from server/squareClient.ts
type SupportedEnvironment = "production" | "sandbox";

function determineEnvironment(): SupportedEnvironment {
  const vercelEnv = process.env.VERCEL_ENV;
  if (vercelEnv) {
    return vercelEnv === "production" ? "production" : "sandbox";
  }

  return process.env.NODE_ENV === "production" ? "production" : "sandbox";
}

const environment = determineEnvironment();

const accessToken =
  environment === "production"
    ? process.env.SQUARE_PRODUCTION_ACCESS_TOKEN ?? process.env.SQUARE_SANDBOX_ACCESS_TOKEN
    : process.env.SQUARE_SANDBOX_ACCESS_TOKEN;

if (!accessToken) {
  throw new Error(
    `Missing Square access token for ${environment} environment. Set the ${
      environment === "production"
        ? "SQUARE_PRODUCTION_ACCESS_TOKEN"
        : "SQUARE_SANDBOX_ACCESS_TOKEN"
    } environment variable.`,
  );
}

const squareClient = new SquareClient({
  token: accessToken,
  environment:
    environment === "production" ? SquareEnvironment.Production : SquareEnvironment.Sandbox,
});

let cachedLocationId: string | undefined;

async function resolveSquareLocationId(): Promise<string> {
  if (cachedLocationId) {
    return cachedLocationId;
  }

  const response = (await squareClient.locations.list()) as Square.ListLocationsResponse;
  const locations = response.locations;
  const location = locations?.find((loc) => loc.status === "ACTIVE") ?? locations?.[0];

  if (!location?.id) {
    throw new Error(
      "Unable to resolve Square location ID. Ensure your Square account has an active location.",
    );
  }

  cachedLocationId = location.id;
  return cachedLocationId;
}

// Checkout logic - inlined from server/squareCheckout.ts
interface CheckoutItemInput {
  id: string;
  quantity: number;
}

async function createSquareCheckoutLink(
  rawItems: CheckoutItemInput[],
): Promise<{ url: string }> {
  if (!Array.isArray(rawItems) || rawItems.length === 0) {
    throw new Error("Cart is empty.");
  }

  // Extract base product ID from cart item IDs (format: "productId-size-color" or just "productId")
  const normalizedItems = rawItems.map((item) => {
    const itemId = String(item.id);
    // Cart items have IDs like "2-M-Default", extract just the product ID part
    const baseProductId = itemId.split('-')[0];
    return {
      id: baseProductId,
      quantity: Number(item.quantity) || 0,
    };
  });

  const validatedItems = normalizedItems.map((item) => {
    const product = getProductById(item.id);
    if (!product) {
      throw new Error(`Product with id ${item.id} not found.`);
    }
    if (item.quantity <= 0) {
      throw new Error(`Invalid quantity for product ${product.name}.`);
    }
    return {
      product,
      quantity: item.quantity,
    };
  });

  const subtotal = validatedItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const shipping = subtotal >= 50 ? 0 : 10;
  const locationId = await resolveSquareLocationId();

  const order: Square.Order = {
    locationId,
    lineItems: validatedItems.map((item) => ({
      name: item.product.name,
      quantity: item.quantity.toString(),
      basePriceMoney: {
        amount: BigInt(Math.round(item.product.price * 100)),
        currency: "USD",
      },
    })),
  };

  if (shipping > 0) {
    order.lineItems?.push({
      name: "Shipping",
      quantity: "1",
      basePriceMoney: {
        amount: BigInt(Math.round(shipping * 100)),
        currency: "USD",
      },
    });
  }

  const redirectUrl =
    process.env.SQUARE_CHECKOUT_REDIRECT_URL || process.env.PUBLIC_SITE_URL || undefined;

  try {
    const response = (await squareClient.checkout.paymentLinks.create({
      idempotencyKey: randomUUID(),
      order,
      checkoutOptions: redirectUrl ? { redirectUrl } : undefined,
    })) as Square.CreatePaymentLinkResponse;

    const url = response.paymentLink?.url ?? undefined;
    if (!url) {
      throw new Error("Square did not return a payment link URL.");
    }

    return { url };
  } catch (error) {
    if (error instanceof SquareError) {
      const firstError = error.errors[0];
      const detail = firstError?.detail || firstError?.category || error.message;
      throw new Error(detail || "Square reported an error while creating the checkout link.");
    }
    throw error;
  }
}

// Vercel serverless function handler
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { items } = (req.body ?? {}) as {
      items?: Array<{ id: string; quantity: number }>;
    };

    const { url } = await createSquareCheckoutLink(items ?? []);
    res.status(200).json({ url });
  } catch (error) {
    console.error("Square checkout error", error);

    const message =
      error instanceof Error
        ? error.message
        : "We were unable to create a checkout link.";
    const statusCode = /cart|product/i.test(message) ? 400 : 500;

    res.status(statusCode).json({ message });
  }
}
