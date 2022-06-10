import { resolve } from "path";
import { Worker } from "worker_threads";
import { getTopCoins } from "./cpc-scrapper.helper";
import { setTimestamp } from "./set-timestamp";

export const handleWorkers = async () => {
  console.log(setTimestamp(), "[Main thread] Getting top coins");

  const topCoins = await getTopCoins();

  const worker = new Worker(resolve(__dirname, "../workers/db.worker.js"));

  console.log(setTimestamp(), "[Main thread] Sending data to redis worker");

  worker.postMessage(topCoins);

  worker.on("message", (message) =>
    console.log(setTimestamp(), "[Main thread] Message received:", message)
  );
};
