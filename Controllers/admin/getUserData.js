const voucherExpense = require("../../models/voucherExpense");

const getYearData = async (req, res) => {
  const userId = req.body.userId;  if (!req.body.userId) {
    return res.status(400).json({ msg: "invalid user  ...." });
  }
  try {
    const response = await voucherExpense.findAll({
      where: { userId: userId },
    });
    if (response.length == 0) {
      return res.status(400).json({ msg: "no data found for that year" });
    }
    return res.status(200).json({ data: response });
  } catch (err) {
    return res.status(400).json({ msg: "err whle finding the data" });
  }
};
module.exports = getYearData;
