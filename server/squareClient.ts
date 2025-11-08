import { Client, Environment } from "square";

const isProduction = process.env.NODE_ENV === "production";

const accessToken = isProduction
  ? process.env.SQUARE_PRODUCTION_ACCESS_TOKEN
  : process.env.SQUARE_SANDBOX_ACCESS_TOKEN;

if (!accessToken) {
  throw new Error(
    `Missing Square access token for ${isProduction ? "production" : "sandbox"} environment.`,
  );
}

export const squareClient = new Client({
  accessToken,
  environment: isProduction ? Environment.Production : Environment.Sandbox,
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
    throw new Error("Unable to resolve Square location ID. Ensure your account has at least one active location.");
  }

  cachedLocationId = location.id;
  return cachedLocationId;
}

