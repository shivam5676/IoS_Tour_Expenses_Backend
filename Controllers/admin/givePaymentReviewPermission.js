const userTable = require("../../models/userTable");

const givePaymentReviewPermission = async (req, res) => {
  const { paymentAdmin } = req.body;

  if (req.role != "superAdmin") {
    return res.status(400).json({ msg: "You are not a SuperAdmin" });
  }
  if (!req.body.userId) {
    return res.status(400).json({ msg: "please provide userId ...." });
  }
  try {
    const getUser = await userTable.findOne({
      where: {
        id: paymentAdmin,
        supervisor: true,
      },
    });
   
    if (getUser) {
      await getUser.update({ paymentAdmin: "true" });
      return res.status(200).json({ msg: "user assigned as a admin" });
    }
    return res.status(400).json({
      msg: "assigned user is not a supervisor,only supervisor can be payment admin",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "something went wrong...." });
  }
};
module.exports = givePaymentReviewPermission;
