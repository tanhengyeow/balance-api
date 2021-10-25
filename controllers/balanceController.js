const balanceService = require("../services/balanceService");

/**
 * Return total balance of user id passed in the request object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getTotalBalance = async (req, res) => {
  try {
    const userBalance = await balanceService.getUserBalance(req.params.id);
    let totalBalance = await balanceService.getAssetsBalance(
      userBalance.assets
    );
    res.send({ totalBalance });
  } catch (e) {
    res.status(400).send(e.message);
  }
};

module.exports = {
  getTotalBalance,
};
