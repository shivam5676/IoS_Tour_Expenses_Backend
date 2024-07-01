const { default: axios } = require("axios");
const userTable = require("../models/userTable");

const superAdmin = async (req, res, next) => {
  const accesstoken = req.body.token;

  try {
    const admin = await axios.get(
      `https://${process.env.COMPANY_DOMAIN}/rest/user.admin.json?auth=${accesstoken}`
    );
    if (admin.data.result) {
      req.role = "superAdmin";
      next();
    } else {
      return res
        .status(400)
        .json({ msg: "only superAdmin can create/delete admin" });
    }
  } catch (error) {
    return res.status(400).json({ msg: "Something went wrong" });
  }
};
module.exports = superAdmin;
