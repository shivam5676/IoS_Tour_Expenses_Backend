const VouchersDescription = require("../../models/VoucherDescription");
const Vouchers = require("../../models/VoucherTable");
const voucherExpense = require("../../models/voucherExpense");

const DeleteOnGoingTour = async (req, res, next) => {
  try {
    const getVouchers = await Vouchers.findOne({
      where: {
        id: req.body.voucherId,
      },
    });
    if (!getVouchers) {
      return res.status(400).json({ msg: "no vouchers found for this id" });
    }
    await VouchersDescription.destroy({
      where: {
        VoucherId: req.body.voucherId,
      },
    });
    await voucherExpense.destroy({
      where: {
        VoucherId: req.body.voucherId,
      },
    });
    await getVouchers.destroy();
    return res.status(200).json({ msg: "tour deleted successfully" });
  } catch (error) {
    return res.status(400).json({ msg: "something went wrong" });
  }
};
module.exports = DeleteOnGoingTour;
