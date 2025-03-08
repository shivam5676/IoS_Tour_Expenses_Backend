const userTable = require("../../models/userTable");

const giveVoucherVerifyPermission = async (req, res) => {
  const { adminId } = req.body;
console.log(req.role)
  if (req.role != "superAdmin" && req.role != "Admin") {
    return res.status(400).json({ msg: "You are not a SuperAdmin or Admin" });
  }
  if (!req.body.userId) {
    return res.status(400).json({ msg: "please provide userId ...." });
  }
  try {
    console.log("first")
    const getUser = await userTable.findOne({
      where: {
        id: adminId,
      },
    });

    if (getUser) {
      await getUser.update({ voucherVerifier: "true" });
      return res.status(200).json({ msg: "user assigned as a voucher Verifier" });
    }
    return res.status(400).json({
      msg: "assigned user is not a found",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "something went wrong...." });
  }
};
module.exports = giveVoucherVerifyPermission;
