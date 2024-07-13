const userTable = require("../../models/userTable");
const getAllUser = async (req, res) => {
  if (req.role != "Admin" ) {
    console.log("objectssssssss", req.role);
    return res.status(400).json({ msg: "You are not a authorised user" });
  }
  if (!req.body.userId) {
    return res.status(400).json({ msg: "invalid user  ...." });
  }
  try {
    const allUserList = await userTable.findAll();
    if (allUserList.length == 0) {
      return res.status(400).json({ msg: "no user found" });
    }
    return res.status(200).json({ users: allUserList });
  } catch (err) {
    return res.status(400).json({ msg: "something went wrong" });
  }
};
module.exports = getAllUser;
