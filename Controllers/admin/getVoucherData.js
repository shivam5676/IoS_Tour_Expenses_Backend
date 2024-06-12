const voucherExpense = require("../../models/voucherExpense");

const getVoucherData = async (req, res) => {
  const VoucherId = req.body.voucher;
  if (!req.body.userId) {
    return res.status(400).json({ msg: "invalid user  ...." });
  }
  try {
    const response = await voucherExpense.findAll({
      where: { voucherId: VoucherId },
    });
    if (response.length == 0) {
      return res.status(400).json({ msg: "no data found for that year" });
    }
    return res.status(200).json({ data: response });
  } catch (err) {
    return res.status(400).json({ msg: "err whle finding the data" });
  }
};
module.exports = getVoucherData;
