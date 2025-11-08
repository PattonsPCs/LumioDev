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
      next(error);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
