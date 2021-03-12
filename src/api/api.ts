import { RatesApiResponseTypeRaw, RatesApiResponseType } from "./types";

const url = "https://api.binance.com/api/v3";

export async function getRates() {
  const response = await fetch(`${url}/ticker/price`);
  const data = (await response.json()) as RatesApiResponseTypeRaw;

  try {
    return transformResponse(data);
  } catch (error) {
    console.log(error);
    throw new Error(`API did not respond correctly`);
  }
}

function transformResponse(
  response: RatesApiResponseTypeRaw
): RatesApiResponseType {
  return response.map((symbol) => ({
    ...symbol,
    price: parseFloat(symbol.price),
    fee: 0,
  }));
}
