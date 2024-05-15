const voucherExpense = require("../../models/voucherExpense");

const getYearData = async (req, res) => {
  const year = req.body.year;
  const userId = req.body.userId;
  try {
    const response = await voucherExpense.findAll({
      where: { date: { [Op.like]: `%${year}%` } },
    });
    if (response.length == 0) {
      return res.status(400).json({ msg: "no data found for that year" });
    }
    return res.status(200).json({ data: response });
  } catch (err) {
    return res.status(400).json({ msg: "err whle finding the data" });
  }
};
module.exports=getYearData
