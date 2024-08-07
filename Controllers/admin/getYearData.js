const { Op } = require("sequelize");
const voucherExpense = require("../../models/voucherExpense");
const Vouchers = require("../../models/VoucherTable");

const getYearData = async (req, res) => { if (req.role != "Admin" && req.role != "supervisor") {
  console.log("objectssssssss",req.role)
  return res.status(400).json({ msg: "You are not a authorised user" });
}
if (!req.body.userId) {
  return res.status(400).json({ msg: "invalid user  ...." });
}
  const year = req.query.year;
  console.log(year)
  const userId = req.body.userId;
  try {
    const response = await voucherExpense.findAll({
      where: { date: { [Op.like]: `%${year}%` } },
      include: [
        {
          model: Vouchers,
          attributes: ['exchangeRates'] // Corrected this part
        }
      ]
    });
    if (response.length == 0) {
      return res.status(400).json({ msg: "no data found for that year" });
    }
    return res.status(200).json({ data: response });
  } catch (err) {
    console.log(err)
    return res.status(400).json({ msg: "err while finding the data" });
  }
};
module.exports=getYearData
