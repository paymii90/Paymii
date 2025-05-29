// import axios from "axios";

// const BASE_URL = "https://api.coingecko.com/api/v3";

// export const getTrendingCoins = async () => {
//   const response = await axios.get(`${BASE_URL}/search/trending`);
//   return response.data.coins;
// };

export const getMarketCoins = async () => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Market Coins API Error:", error);
    return [];
  }
};

export const fetchExchangeRate = async () => {
  try {
    const response = await fetch(
      "https://api.exchangerate-api.com/v4/latest/USD"
    );
    const data = await response.json();
    return data.rates.GHS;
  } catch (error) {
    console.error("❌ Error fetching exchange rate: ", error);
    return "12";
  }
};
