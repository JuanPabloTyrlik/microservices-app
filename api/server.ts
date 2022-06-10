import cors from "cors";
import express, { Request, Response } from "express";
import { connect } from "mongoose";
import { CoinModel } from "./schemas/coin.schema";

(async () => {
  const app = express();
  app.use(cors({ origin: "*" }));

  app.get("/api/top-coins", async (req: Request, res: Response) => {
    await connect("mongodb://mongo:27017/crypto");

    const coins = await CoinModel.find({}).sort({ timestamp: -1 }).limit(10);

    res.status(200).json({ coins });
  });

  app.listen(3000, () => console.log("[API] Listening on port 3000"));
})();
