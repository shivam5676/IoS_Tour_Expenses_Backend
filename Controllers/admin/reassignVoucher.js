const Vouchers = require("../../models/VoucherTable");

const reAssignVoucher = async (req, res, next) => {
  const { voucherId, AccountDepartment } = req.body;
  if (!AccountDepartment) {
    return res
      .status(400)
      .json({ msg: "please select re assigned supervisor" });
  }
  try {
    const getVoucher = await Vouchers.findOne({
      where: {
        id: voucherId,
      },
    });
    if (!getVoucher) {
      return res.status(400).json({ msg: "no voucher found " });
    }
    await getVoucher.update({ assignedTo: AccountDepartment });
    return res.status(200).json({ msg: "re-assigning successful" });
  } catch (err) {
    return res
      .status(400)
      .json({ msg: "re-assigning successfulsomething went wrong" });
  }
};
module.exports = reAssignVoucher;
