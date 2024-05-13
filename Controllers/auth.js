const userTable = require("../models/userTable");
const Login = async (req, res, next) => {
  const email = req.body.email;
  try {
    const loginResponse = await userTable.findOne({
      where: {
        email: email,
      },
    });
    if (loginResponse) {
      return res.status(200).json({ data: loginResponse });
    }
    return res.status(400).json({ msg: "false" });
  } catch (err) {
    return res.status(400).json({ msg: "false" });
  }
};
module.exports = { Login };
