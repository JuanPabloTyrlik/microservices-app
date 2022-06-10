import { parentPort } from "worker_threads";
import { saveTopCoins } from "../helpers/redis.helper";
import { setTimestamp } from "../helpers/set-timestamp";

parentPort?.on("message", async (topCoins: Record<string, any>[]) => {
  console.log(setTimestamp(), "[DB Worker] Saving information to Redis");

  await saveTopCoins(topCoins);

  console.log(setTimestamp(), "[DB Worker] Data saved to Redis");
  parentPort?.postMessage("Data saved to Redis");
});
