const Vouchers = require("../../models/VoucherTable");
const userTable = require("../../models/userTable");

const getAllVoucher = async (req, res) => {
  const response = await Vouchers.findAll({
    include: [{ model: userTable, attributes: ["firstName", "lastName"] }],
  });
  if (response.length == 0) {
    return res.status(200).json({ msg: "no voucher found" });
  }
  console.log(response);
  return res.status(200).json({ userList: response });
};
module.exports = getAllVoucher;
