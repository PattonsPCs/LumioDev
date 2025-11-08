import { randomUUID } from "crypto";
import { SquareError, Square } from "square";
import { squareClient, resolveSquareLocationId } from "./squareClient";
import { getProductById } from "./products";

interface CheckoutItemInput {
  id: string;
  quantity: number;
}

export async function createSquareCheckoutLink(
  rawItems: CheckoutItemInput[],
): Promise<{ url: string }> {
  if (!Array.isArray(rawItems) || rawItems.length === 0) {
    throw new Error("Cart is empty.");
  }

  const normalizedItems = rawItems.map((item) => ({
    id: String(item.id),
    quantity: Number(item.quantity) || 0,
  }));

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

