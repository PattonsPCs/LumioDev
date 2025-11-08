import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { createSquareCheckoutLink } from "./squareCheckout";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/square/checkout-link", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { items } = req.body as {
        items?: Array<{ id: string; quantity: number }>;
      };

      const { url } = await createSquareCheckoutLink(items ?? []);
      res.json({ url });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "We were unable to create a checkout link.";
      const statusCode = /cart|product/i.test(message) ? 400 : 500;

      res.status(statusCode).json({ message });
      next(error);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
