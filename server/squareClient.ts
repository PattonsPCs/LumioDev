import { Client, Environment } from "square";

function determineEnvironment() {
  const vercelEnv = process.env.VERCEL_ENV;
  if (vercelEnv) {
    return vercelEnv === "production" ? "production" : "sandbox";
  }

  // Local dev / other hosts
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

export const squareClient = new Client({
  accessToken,
  environment: environment === "production" ? Environment.Production : Environment.Sandbox,
});

let cachedLocationId: string | null = null;

export async function resolveSquareLocationId(): Promise<string> {
  if (cachedLocationId) {
    return cachedLocationId;
  }

  const { locationsApi } = squareClient;
  const response = await locationsApi.listLocations();

  const location = response.result.locations?.[0];

  if (!location?.id) {
    throw new Error(
      "Unable to resolve Square location ID. Ensure your Square account has an active location.",
    );
  }

  cachedLocationId = location.id;
  return cachedLocationId;
}

