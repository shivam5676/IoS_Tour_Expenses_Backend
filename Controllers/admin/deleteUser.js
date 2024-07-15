const userTable = require("../../models/userTable");

const deleteUser = async (req, res, next) => {

  const {delId} = req.body;

  if (req.role != "Admin") {
    return res.status(400).json({ msg: "You are not a admin" });
  }
  if (!req.body.userId) {
    return res.status(400).json({ msg: "invalid user  ...." });
  }
  try {
    const getUser = await userTable.findOne({
      where: {
        id: delId,
      },
    });
    if (getUser) {
      await getUser.destroy();
      return res.status(200).json({ msg: "user deleted successfully" });
    }
    return res.status(400).json({ msg: "invalid user" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "something went wrong...." });
  }
};
module.exports = deleteUser;
