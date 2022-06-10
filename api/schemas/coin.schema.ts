import { model, Schema } from "mongoose";

const CoinSchema = new Schema({
  rank: String,
  name: String,
  symbol: String,
  price: Number,
  marketCap: Number,
  timestamp: Date,
});

export const CoinModel = model("Coin", CoinSchema);
