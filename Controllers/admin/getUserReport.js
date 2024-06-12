const Vouchers = require("../../models/VoucherTable");
const userTable = require("../../models/userTable");
const voucherExpense = require("../../models/voucherExpense");

const getUserReport = async (req, res) => {
  if (req.role != "Admin" && req.role != "supervisor") {
    return res.status(400).json({ msg: "You are not a authorised user" });
  }
  const userId = req.query.uid;

  if (!req.body.userId) {
    return res.status(400).json({ msg: "invalid user  ...." });
  }
  try {
    const response = await Vouchers.findAll({
      where: { userId: userId, statusType: "Accepted" },
      include: [
        { model: voucherExpense },
        {
          model: userTable,
          attributes: ["firstName", "lastName"],
        },
      ],
    });
    console.log(response);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
};
module.exports = getUserReport;
