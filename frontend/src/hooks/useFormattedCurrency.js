import { useCoins } from "../context/CoinContext";

export const useFormattedCurrency = () => {
  const { exchangeRate } = useCoins();

  return (amount) => {
    if (isNaN(amount)) return "GH₵0.00";

    return (
      "GH₵ " +
      parseFloat(amount * exchangeRate)
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    );
  };
};
