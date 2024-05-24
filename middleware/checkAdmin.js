const { default: axios } = require("axios");

const checkAdmin = async (req, res, next) => {
  const accesstoken = req.body.token;
  const admin = await axios.get(
    `https://oipl.bitrix24.in/rest/user.admin.json?auth=${accesstoken}`
  );

  if (admin.data.result == false) {
    console.log(admin.data.result == false);
    req.role = "Admin";
    next();
  }

  // return res.status(400).json({ msg: "user is not a admin" });
};
module.exports = checkAdmin;
