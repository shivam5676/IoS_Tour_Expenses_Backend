const userTable = require("../../models/userTable");
const getAllUser = async (req, res) => {
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
