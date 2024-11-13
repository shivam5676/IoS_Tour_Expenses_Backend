const Vouchers = require("../../models/VoucherTable");

const reAssignVoucher = async (req, res, next) => {
  const { voucherId, AccountDepartment, assignedName } = req.body;
  if (!AccountDepartment) {
    return res
      .status(400)
      .json({ msg: "please select re assigned supervisor" });
  }
  if (!req.body.userId) {
    return res.status(400).json({ msg: "invalid user  ...." });
  }
  try {
    const getVoucher = await Vouchers.findOne({
      where: {
        id: voucherId,
      },
    });
    if(getVoucher.statusType=="Pending"){
      return res.status(400).json({ msg: "Pending Voucher can not be re assigned " });
    }
    if (!getVoucher) {
      return res.status(400).json({ msg: "no voucher found " });
    }
    await getVoucher.update({
      assignedTo: AccountDepartment,
      assignedName: assignedName,
    });
    return res.status(200).json({ msg: "re-assigning to account department successful" });
  } catch (err) {
    return res
      .status(400)
      .json({ msg: "something went wrong" });
  }
};
module.exports = reAssignVoucher;
