const userTable = require("../../models/userTable");
const db = require("../../util/database");

const getUser = async (req, res) => {
  try {
    const findUser = userTable.findOne({
      where: {
        id: req.body.userId,
      },
    });
    if (!findUser) {
      return res.status(400).json({ msg: "no user exist" });
    }
    return res.status(200).json({ user: findUser });
  } catch (err) {
    return res.status(400).json({ msg: "error while finding user" });
  }
};
module.exports = getUser;
