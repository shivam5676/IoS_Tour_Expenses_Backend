const voucherExpense = require("../../models/voucherExpense");

const getTourExpenses = async (req, res) => {
  const voucherId = req.body.voucherId;
  if (!req.body.userId) {
    return res.status(400).json({ msg: "invalid user  ...." });
  }
  try {
    const expenses = await voucherExpense.findAll({
      where: { voucherId: voucherId, userId: req.body.userId },
    });
    if (expenses.length == 0) {
      return res.status(400).json({ msg: "no expense found" });
    }
    return res.status(200).json({ expenses: expenses });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "something went wrong try again....." });
  }
};
module.exports = getTourExpenses;
