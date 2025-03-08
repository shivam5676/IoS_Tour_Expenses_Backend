const userTable = require("../../models/userTable");

const removeVoucherVerifyPermission = async (req, res) => {
  const { adminId } = req.body;

  if (req.role != "superAdmin" && req.role != "Admin") {
    return res.status(400).json({ msg: "You are not a SuperAdmin or Admin" });
  }
  if (!req.body.userId) {
    return res.status(400).json({ msg: "please provide userId ...." });
  }
  try {
    const getUser = await userTable.findOne({
      where: {
        id: adminId,
        voucherVerifier: true,
      },
    });

    if (getUser) {
      await getUser.update({ voucherVerifier: false });
      return res
        .status(200)
        .json({ msg: "user removed from  voucher Verifier list" });
    }
    return res.status(400).json({
      msg: "assigned user is not  found",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "something went wrong...." });
  }
};
module.exports = removeVoucherVerifyPermission;
