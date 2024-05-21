const userTable = require("../models/userTable");
const jwt = require("jsonwebtoken");
const Login = async (req, res, next) => {
  const email = req.body.email;
  try {
    const loginResponse = await userTable.findOne({
      where: {
        email: email,
      },
      attributes: { exclude: ["password", "id"] },
    });
    if (loginResponse) {
      const token = jwt.sign(loginResponse.toJSON(), "helloShivam");
      return res.status(200).json({ data: loginResponse, token });
    }
    return res.status(400).json({ msg: "false" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "false" });
  }
};
module.exports = { Login };
