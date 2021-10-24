const axios = require("axios");

/**
 * Returns API link of currency pair
 * @param {String} currency1
 * @param {String} currency2
 * @returns {String} Final API link
 */
const getCurrencyPairAPI = (
  currency1,
  currency2
) => `https://www.bitstamp.net/api/v2/ticker/${currency1}${currency2}/
`;

/**
 * Calculates the price of the currency according to the amount
 * @param {String} amount - Amount of currency
 * @param {String} currency1
 * @param {String} currency2 - Defaults to "usd" if not specified
 * @returns {float}
 */
const getCurrencyPrice = async (amount, currency1, currency2 = "usd") => {
  try {
    const result = await axios.get(getCurrencyPairAPI(currency1, currency2));
    const lastPrice = result?.data?.last;
    if (!lastPrice) throw new Error("Error fetching balances");
    return lastPrice * amount;
  } catch (e) {
    throw e;
  }
};

module.exports = {
  getCurrencyPrice,
};
