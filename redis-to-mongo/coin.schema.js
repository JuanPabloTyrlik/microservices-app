const { model, Schema } = require("mongoose");

const CoinSchema = new Schema({
  rank: Number,
  name: String,
  symbol: String,
  price: Number,
  marketCap: Number,
  timestamp: Date,
});

const CoinModel = model("Coin", CoinSchema);
module.exports = {
  CoinModel,
};
