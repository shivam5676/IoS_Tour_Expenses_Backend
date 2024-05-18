const Vouchers = require("../../models/VoucherTable");
const voucherExpense = require("../../models/voucherExpense");
const userTable = require("../../models/userTable");
const VouchersDescription = require("../../models/VoucherDescription");
const trackVoucherStatus = async (req, res) => {
    console.log("object")
  const VoucherId = req.body.voucherId;
  console.log(VoucherId)
//   if (!VoucherId) {
//     return;
//   }
  try {
    const response = await Vouchers.findOne({
      where: { id: VoucherId },
      include: [{ model: userTable ,attributes:['firstName','lastName']},{ model: VouchersDescription },{ model: voucherExpense}],
    });
    
    if (!response) {
      return res.status(400).json({ msg: "no data found for that voucher" });
    }
    return res.status(200).json({  response });
  } catch (err) {
    console.log("----------err",err)
    return res.status(400).json({ msg: "err whle finding the data",err:err });
  }
};
module.exports = trackVoucherStatus;
