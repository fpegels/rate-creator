export type RatesApiResponseTypeRaw = {
  symbol: string;
  price: string;
}[];

export type RatesApiResponseType = {
  symbol: string;
  price: number;
  fee: number;
}[];
