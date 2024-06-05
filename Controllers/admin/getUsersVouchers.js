const Vouchers = require("../../models/VoucherTable");

const getUsersVouchers = async (req, res) => { if (req.role != "Admin" && req.role != "supervisor") {
  console.log("objectssssssss",req.role)
  return res.status(400).json({ msg: "You are not a authorised user" });
}
  try {
    const vouchers = Vouchers.findAll({
      where: {
        id: req.body.userId,
      },
    });
    return res.status(200).json({ data: vouchers });
  } catch (err) {
    return res.status(400).json({ msg: "err while finding vouchers " });
  }
};
module.exports = getUsersVouchers;
