const userTable = require("../../models/userTable");

const deleteAdmin = async (req, res, next) => {
  console.log("executing delete component");
  const { adminId } = req.body;

  if (req.role != "superAdmin") {
    return res.status(400).json({ msg: "You are not a SuperAdmin" });
  }
  if (!req.body.userId) {
    return res.status(400).json({ msg: "please provide userId ...." });
  }
  try {
    const getUser = await userTable.findOne({
      where: {
        id: adminId,
        supervisor: true,
      },
    });
    if (getUser) {
      console.log(getUser);
      await getUser.update({ isAdmin: false });
      return res.status(200).json({ msg: "admin permission removed" });
    }
    return res.status(400).json({
      msg: "assigned user is not a supervisor,only supervisor can be admin",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "something went wrong...." });
  }
};
module.exports = deleteAdmin;
