const userTable = require("../../models/userTable");
const db = require("../../util/database");

const createUser = async (req, res) => {
  if (req.role != "Admin" && req.role != "supervisor") {
    return res.status(400).json({ msg: "You are not a authorised user" });
  }
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const isAdmin = req.body.isAdmin;
  const mobile = req.body.mobile;
  const password = req.body.password;
  const signupResponse = await userTable.findOne({
    where: { email: req.body.email },
  });
  if (signupResponse) {
    return res
      .status(400)
      .json({ msg: "account already created with this email id" });
  }
  try {
    const response = await userTable.create({
      firstName,
      lastName,
      email,
      isAdmin: false,
      mobile,
      password,
    });
    return res.status(200).json({ msg: "account created successfully" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "something went wrong" });
  }
};
module.exports = createUser;
