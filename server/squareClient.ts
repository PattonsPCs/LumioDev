import { SquareClient, SquareEnvironment, Square } from "square";

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

export const squareClient = new SquareClient({
  token: accessToken,
  environment:
    environment === "production" ? SquareEnvironment.Production : SquareEnvironment.Sandbox,
});

let cachedLocationId: string | undefined;

export async function resolveSquareLocationId(): Promise<string> {
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

