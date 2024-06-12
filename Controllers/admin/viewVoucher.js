const Vouchers = require("../../models/VoucherTable");

const viewVoucher = async (req, res) => {
  if (!req.body.userId) {
    return res.status(400).json({ msg: "invalid user  ...." });
  }
  try {
    const voucherDetail = await Vouchers.findOne({
      where: {
        id: req.body.voucherNo,
      },
    });
    if (!voucherDetail) {
      return res.status(400).json({ msg: "voucher no is invalid" });
    }
    return res.status(200).json({ data: voucherDetail });
  } catch (err) {
    return res.status(400).json({ msg: "err while finding voucher details " });
  }
};
module.exports = viewVoucher;
