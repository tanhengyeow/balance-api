const db = require("../db");
const helpers = require("./helpers/getCurrencyPrice");

/**
 * Find a database entry for the user id
 * @param {String} id
 * @returns {Object} User balance of user id
 */
const getUserBalance = async (id) => {
  try {
    const userBalance = await db.getUserBalance(id);
    if (!userBalance) throw new Error(`User ${id} not found`);
    return userBalance;
  } catch (e) {
    throw e;
  }
};

/**
 * Calculates the balance of all assets
 * @param {Object} assets - Object containg key-value pairs of currencies (e.g 'btc', 'eth) and their amount
 * @returns {float} - Total balance
 */
const getAssetsBalance = async (assets) => {
  // Populate array of API calls to get currency pair of all assets
  const promises = Object.entries(assets).map(async ([currency, amount]) => {
    return await helpers.getCurrencyPrice(amount, currency);
  });
  // Call API calls in parallel to fetch all the currency pairs
  const results = await Promise.allSettled(promises);
  // Return error if there any failed API calls
  const rejected = results.filter((result) => result.status === "rejected");
  if (rejected.length > 0) {
    throw new Error("Error fetching balances");
  }
  // Return total balance for all assets
  return results
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value)
    .reduce((sum, curr) => sum + curr, 0);
};

module.exports = {
  getUserBalance,
  getAssetsBalance,
};
