const Vouchers = require("../../models/VoucherTable");
const userTable = require("../../models/userTable");
const voucherExpense = require("../../models/voucherExpense");
const db = require("../../util/database");

const getUser = async (req, res) => {
  console.log(req.query.id);
  // return;
  try {
    const findUser = await userTable.findOne({
      where: {
        id: req.query.id,
      },
      include: [
        { model: Vouchers },
        { model: voucherExpense },
        // { model:  }
        // Add more models as needed
      ],
    });

    console.log(findUser.Vouchers);
    if (!findUser) {
      return res.status(400).json({ msg: "no user exist" });
    }
    return res.status(200).json({ user: findUser });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "error while finding user" });
  }
};
module.exports = getUser;
