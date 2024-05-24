const Vouchers = require("../../models/VoucherTable");
const userTable = require("../../models/userTable");

const getAllVoucher = async (req, res) => {
  // if (req.role != "Admin") {
  //   return res.status(400).json({ msg: "You are not a admin" });
  // }
  console.log("object")
  // return
  const response = await Vouchers.findAll({
    include: [{ model: userTable, attributes: ["firstName", "lastName"] }],
  });
  if (response.length == 0) {
    return res.status(400).json({ msg: "no voucher found" });
  }
  console.log(response);
  return res.status(200).json({ userList: response });
};
module.exports = getAllVoucher;
