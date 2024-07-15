const Vouchers = require("../../models/VoucherTable");

const closeVoucher = async (req, res, next) => {
  const voucherId = req.body.voucherId;
  try {
    const getVoucher = await Vouchers.findOne(
      //   { stausType: "Pending" },
      { where: { id: voucherId } }
    );
    if (!getVoucher) {
      return res.status(400).json({ msg: "something went wrong" });
    }
    const response = await getVoucher.update({
      statusType: "Closed",
    });
    return res.status(200).json({ msg: "voucher successfully closed..." });
  } catch (error) {
    return res.status(500).json({ msg: "something went wrong" });
  }
};
module.exports = closeVoucher;
