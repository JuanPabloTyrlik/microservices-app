import cors from "cors";
import express, { Request, Response } from "express";
import { connect } from "mongoose";
import { aggregation } from "./constants";
import { CoinModel } from "./schemas/coin.schema";

(async () => {
  const app = express();
  app.use(cors({ origin: "*" }));

  app.get("/api/top-coins", async (req: Request, res: Response) => {
    await connect("mongodb://mongo:27017/crypto");

    const coins = await CoinModel.aggregate(aggregation);

    res.status(200).json({ coins });
  });

  app.listen(3000, () => console.log("[API] Listening on port 3000"));
})();
