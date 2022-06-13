import { PipelineStage } from "mongoose";

export const aggregation: PipelineStage[] = [
  {
    $match: {
      $expr: {
        $gte: [
          7,
          {
            $dateDiff: {
              startDate: "$timestamp",
              endDate: new Date("Mon, 13 Jun 2022 17:58:17 GMT"),
              unit: "day",
            },
          },
        ],
      },
    },
  },
  {
    $group: {
      _id: "$symbol",
      rank: {
        $last: "$rank",
      },
      name: {
        $last: "$name",
      },
      symbol: {
        $last: "$symbol",
      },
      price: {
        $last: "$price",
      },
      marketCap: {
        $last: "$marketCap",
      },
      timestamp: {
        $last: "$timestamp",
      },
      "7drank": {
        $first: "$rank",
      },
      "7dprice": {
        $first: "$price",
      },
      "7dmarketCap": {
        $first: "$marketCap",
      },
    },
  },
  {
    $project: {
      _id: 0,
      rank: 1,
      name: 1,
      symbol: 1,
      price: 1,
      marketCap: 1,
      "7d": {
        rank: {
          $round: [
            {
              $subtract: ["$rank", "$7drank"],
            },
            0,
          ],
        },
        price: {
          $round: [
            {
              $subtract: ["$price", "$7dprice"],
            },
            4,
          ],
        },
        marketCap: {
          $round: [
            {
              $subtract: ["$marketCap", "$7dmarketCap"],
            },
            0,
          ],
        },
      },
    },
  },
  {
    $sort: {
      rank: 1,
    },
  },
];
