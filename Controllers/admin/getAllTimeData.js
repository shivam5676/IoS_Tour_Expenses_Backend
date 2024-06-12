const { Op } = require("sequelize");
const Vouchers = require("../../models/VoucherTable");
const voucherExpense = require("../../models/voucherExpense");

const getAllTimeData = async (req, res, next) => {
  try {
    const allVouchers = await Vouchers.findAll({
      where: { statusType: "Accepted",},
      include: [voucherExpense],
    });
    if (allVouchers.length <= 0) {
      return res.status(400).json({ msg: "no data found" });
    }
    return res.status(200).json({ allVouchers });
  } catch (err) {
    console.log(err)
    return res.status(400).json({ msg: "something went wrong" });
  }
};
module.exports = getAllTimeData;
