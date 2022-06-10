const { connect, connection: mongooseConnection } = require("mongoose");
const { createClient } = require("redis");
const { CoinModel } = require("./coin.schema");
const { setTimestamp } = require("./set-timestamp");

(async () => {
  const redisClient = createClient({ url: "redis://redis:6379" });

  mongooseConnection.on("error", (err) =>
    console.log(setTimestamp(), "[Mongoose] Client Error", err)
  );
  mongooseConnection.once("open", () =>
    console.log(setTimestamp(), "[Mongoose] Connection established")
  );

  redisClient.on("error", (err) =>
    console.log(setTimestamp(), "[Redis] Client Error", err)
  );
  redisClient.once("ready", () =>
    console.log(setTimestamp(), "[Redis] Connection established")
  );

  await Promise.all([
    connect("mongodb://mongo:27017/crypto"),
    redisClient.connect(),
  ]);

  redisClient.subscribe("top-coins", async (recordStr) => {
    console.log(setTimestamp(), "[Redis] Event received");
    const { timestamp, topCoins } = JSON.parse(recordStr);

    const coins = topCoins.map((coin) => ({ ...coin, timestamp }));

    await CoinModel.insertMany(coins);

    console.log(setTimestamp(), "[Mongo] Coins saved");
  });
})();
