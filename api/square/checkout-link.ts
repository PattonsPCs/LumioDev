import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createSquareCheckoutLink } from "../../server/squareCheckout";

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
    const statusCode =
      error instanceof Error && /cart|product/i.test(error.message) ? 400 : 500;

    res.status(statusCode).json({
      message:
        error instanceof Error
          ? error.message
          : "We were unable to create a checkout link.",
    });
  }
}

