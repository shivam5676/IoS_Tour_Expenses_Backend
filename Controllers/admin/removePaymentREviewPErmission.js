const userTable = require("../../models/userTable");

const removePaymentReviewPermission = async (req, res) => {
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
        paymentAdmin: true,
      },
    });
    if (getUser) {
      await getUser.update({ paymentAdmin: false });
      return res.status(200).json({ msg: "user assigned as a admin" });
    }
    return res.status(400).json({
      msg: "assigned user dont have a payemnt review permission...",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "something went wrong...." });
  }
};
module.exports = removePaymentReviewPermission;
