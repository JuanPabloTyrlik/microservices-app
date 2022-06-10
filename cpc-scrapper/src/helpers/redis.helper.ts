import { createClient } from "redis";
import { setTimestamp } from "./set-timestamp";

const client = createClient({ url: "redis://redis:6379" });

client.on("error", (err) =>
  console.log(setTimestamp(), "[Redis] Client Error", err)
);

export const saveTopCoins = async (topCoins: Record<string, any>[]) => {
  await client.connect();

  const timestamp = new Date().toISOString();

  await client.set(timestamp, JSON.stringify(topCoins));
  await client.publish(
    "top-coins",
    JSON.stringify({
      timestamp,
      topCoins,
    })
  );
};
