const { default: axios } = require("axios");

const checkAdmin = async (req, res, next) => {
  const accesstoken = req.body.token;
  const admin = await axios.get(
    `https://b24-awzvaa.bitrix24.in/rest/user.admin.json?auth=${accesstoken}`
  );

  if (!admin.data.result) {
    console.log(admin.data.result == false);
    return res.status(400).json({ msg: "user is not a admin" });
  }
  req.role = "Admin";
  next();
};
module.exports = checkAdmin;
