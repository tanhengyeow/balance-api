// https://github.com/bajankristof/nedb-promises
const Datastore = require("nedb-promises");
let db = new Datastore();

const userBalances = [
  {
    id: "1",
    assets: {
      btc: "0.5",
      eth: "2",
    },
  },
  {
    id: "2",
    assets: {
      btc: "0.1",
    },
  },
  {
    id: "3",
    assets: {
      eth: "5",
    },
  },
  {
    id: "4",
    assets: {
      eth: "5",
      btc: "0.2",
    },
  },
  {
    id: "5",
    assets: {},
  },
];
db.insert(userBalances);

/**
 * Find a database entry for the user id
 * @param {String} id
 * @returns {Object} User balance of user id
 */
const getUserBalance = async (id) => {
  try {
    return db.findOne({ id });
  } catch (e) {
    throw e;
  }
};

module.exports = {
  getUserBalance,
};
