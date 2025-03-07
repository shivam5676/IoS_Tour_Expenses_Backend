const userTable = require("../models/userTable");

const assignVoucherToVerifier = async (req, res, next) => {
  const accessToken = req.body.token;
  const userId = req.body.userId;
  const DepartMentId = req.body.UF_Department_Id;
  console.log("hello");
  try {
    const voucherVErifierAvailable = await userTable.findOne({
      where: { voucherVerifier: true },
      attributes: ["id"],
    });
    console.log(voucherVErifierAvailable);
    if (!voucherVErifierAvailable) {
      const paymentAdminAvailable = await userTable.findOne({
        where: { paymentAdmin: true },
        attributes: ["id"],
      });
      if (!paymentAdminAvailable) {
        return res.status(400).json({
          msg: "no verifier/payment handling admin found for  your voucher ..plz try again  or report this to your supervisor or HR Department",
        });
      }
      req.body.assignedTo = paymentAdminAvailable.id;
      next();
    } else {
      req.body.assignedTo = voucherVErifierAvailable.id;
      next();
    }
  } catch (err) {
    return res.status(400).json({ msg: "something went wrong" });
  }
};
module.exports = assignVoucherToVerifier;
