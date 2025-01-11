const userTable = require("../models/userTable");

const assignVoucherToPaymentAdmin = async (req, res, next) => {
  const accessToken = req.body.token;
  const userId = req.body.userId;
  const DepartMentId = req.body.UF_Department_Id;
  console.log("hello");
  try {
    const paymentAdminAvailable = await userTable.findOne({
      where: { paymentAdmin: true },
      attributes: ["id"],
    });
    console.log(paymentAdminAvailable);
    if (!paymentAdminAvailable) {
      const adminAvailable = await userTable.findOne({
        where: { isAdmin: true },
        attributes: ["id"],
      });
      if (!adminAvailable) {
        return res.status(400).json({
          msg: "no admin found for  assigning ..plz try later or repoprt this to yoour hierrachy supervisor",
        });
      }
      req.body.assignedTo = adminAvailable.id;
      next();
    } else {
      req.body.assignedTo = paymentAdminAvailable.id;
      next();
    }
  } catch (err) {
    return res.status(400).json({ msg: "something went wrong" });
  }
};
module.exports = assignVoucherToPaymentAdmin;
