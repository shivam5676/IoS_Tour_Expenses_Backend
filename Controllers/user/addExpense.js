const voucherExpense = require("../../models/voucherExpense");

const addExpense = async (req, res, next) => {
  const {
    amount,
    expenseType,
    description,
    voucher,
    paymentType,
    date,
    voucherId,
    userId,
  } = req.body;
  console.log(amount);
  // return
  if (!amount) {
    return res.status(400).json({ msg: "amount can not null" });
  }
  if (isNaN(amount)) {
    return res.status(400).json({ msg: "amount can not string" });
  }
  if (!expenseType) {
    return res.status(400).json({ msg: "expense type can not null" });
  }
  if (!paymentType) {
    return res.status(400).json({ msg: "payment type can not null" });
  }
  if (!date) {
    return res.status(400).json({ msg: "please select date " });
  }
  try {
    const response = await voucherExpense.create({
      Amount: +amount,
      expenseType,
      voucherNo: voucher,
      paymentType,
      date,
      description,
      VoucherId: voucherId,
      userId,
    });
    if (response) {
      return res.status(200).json({ expenseData: response });
    }
    console.log(response);
    return res
      .status(400)
      .json({ msg: "some problem while saving Your expense" });
  } catch (err) {
    return res
      .status(400)
      .json({ msg: "something went wrong !! try again ...." });
  }
};
module.exports = addExpense;
