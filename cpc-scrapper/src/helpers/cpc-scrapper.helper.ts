import axios from "axios";
import { load } from "cheerio";
import { CoinDto } from "../dto/coin.dto";

const url = "https://coinmarketcap.com/";

export const getTopCoins = async () => {
  const { data: html } = await axios.get(url);
  const $ = load(html);
  const coins: CoinDto[] = [];

  const table = $(".cmc-table > tbody > tr");

  const columns = [, "rank", "name", "price", , , "marketCap"];

  table.each((rowIdx, rowElem) => {
    const coin: Record<string, any> = {};
    if (rowIdx < 10) {
      $(rowElem)
        .children()
        .each((fieldIdx, fieldElem) => {
          const fieldValue = $(fieldElem).text();

          if (fieldValue) {
            const key = columns[fieldIdx];
            if (key) coin[key] = fieldValue;
          }
        });

      coins.push(new CoinDto(coin));
    }
  });

  return coins;
};
