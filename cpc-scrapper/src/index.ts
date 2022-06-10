import { schedule } from "node-cron";
import { handleWorkers } from "./helpers/handle-workers.helper";
import { setTimestamp } from "./helpers/set-timestamp";

(async () => {
  console.log(setTimestamp(), "[Cron] Scheduling task");
  const task = schedule("0 */5 * * * *", async () => {
    console.log(setTimestamp(), "[Cron] Task started");
    await handleWorkers();
  });
  task.start();
})();
