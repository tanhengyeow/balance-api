/**
 * Default response sent for any API requests
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getHome = (req, res) => {
  res.send("APIs supported:\n1. GET /balances/:id");
};

module.exports = {
  getHome,
};
