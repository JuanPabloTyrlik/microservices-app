export class CoinDto {
  rank: string;
  name: string;
  symbol: string;
  price: number;
  marketCap: number;

  constructor(coin: any) {
    this.rank = coin["rank"];
    this.name = coin["name"].slice(0, coin["name"].indexOf(coin["rank"]));
    this.symbol = coin["name"].slice(
      coin["name"].indexOf(coin["rank"]) + coin["rank"].length
    );
    this.price = +coin["price"].replace(/[$,]/g, "");
    this.marketCap = +coin["marketCap"]
      .slice(coin["marketCap"].lastIndexOf("$"))
      .replace(/[$,]/g, "");
  }
}
