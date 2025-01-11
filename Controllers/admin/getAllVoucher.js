const Vouchers = require("../../models/VoucherTable");
const assignedVoucher = require("../../models/assignedVoucher");
const userTable = require("../../models/userTable");

const getAllVoucher = async (req, res) => {
  console.log(req.role)
  if (req.role != "Admin" && req.role!="paymentAdmin") {
    return res.status(400).json({ msg: "You are not a authorised user" });
  }
  if (!req.body.userId) {
    return res.status(400).json({ msg: "invalid user  ...." });
  }

  try {
    const response = await assignedVoucher.findAll({
      where: {
        assignedTo: req.body.userId,
      },
      include: [
        { model: userTable, attributes: ["firstName", "lastName"] },
        { model: Vouchers },
      ],
    });
    if (response.length == 0) {
      return res.status(200).json({ userList: [], msg: "no voucher found" });
    }

    return res.status(200).json({ userList: response });
  } catch (err) {
    return res.status(400).json({ msg: "something went wrong",err:err });
  }
};
module.exports = getAllVoucher;
