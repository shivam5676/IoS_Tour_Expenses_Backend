const { where } = require("sequelize");
const Vouchers = require("../../models/VoucherTable");
const userTable = require("../../models/userTable");
// const Vouchers = require("../../models/VoucherTable");
// const userTable = require("../../models/userTable");

const getPendingVoucher = async (req, res) => {
  //   if (req.role != "Admin") {
  //     return res.status(400).json({ msg: "You are not a admin" });
  //   }
  console.log("object=================>");
  // return
  try {
    const response = await Vouchers.findAll({
      where: { statusType: "Pending", userId: req.body.userId },
      include: [{ model: userTable, attributes: ["firstName", "lastName"] }],
    });
    if (response.length == 0) {
      return res.status(400).json({ msg: "no voucher found" });
    }
    console.log(response);
    return res.status(200).json({ userList: response });
  } catch (err) {
    console.log(err);
  }
};
module.exports = getPendingVoucher;
