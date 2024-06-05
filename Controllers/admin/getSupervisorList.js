const userTable = require("../../models/userTable");

const getSuperVisor = async (req, res, next) => {
  if (req.role != "Admin") {
    return res
      .status(400)
      .json({ msg: "Only admin can access this functionality" });
  }
  try {
    const superVisorlist = await userTable.findAll({
      where: {
        supervisor: true,
      },
      attributes: ["id", "firstName", "lastName"],
    });
    if (superVisorlist.length == 0) {
      return res.status(400).json({ msg: "no user found" });
    }
    return res.status(200).json({ supervisorList: superVisorlist });
  } catch (err) {
    return res.status(400).json({ msg: "something went wrong" });
  }
};
module.exports = getSuperVisor;
