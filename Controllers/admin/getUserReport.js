const Vouchers = require("../../models/VoucherTable");
const voucherExpense = require("../../models/voucherExpense");

const getUserReport = async (req, res) => {
  const userId = req.query.uid;
  console.log(userId);
  try {
    const response = await Vouchers.findAll({
      where: { userId: userId, statusType: "Accepted" },
      include: [{ model: voucherExpense }],
    });
    return res.status(200).json( response );
  } catch (err) {
    console.log(err);
  }
};
module.exports = getUserReport;
