const { default: axios } = require("axios");
const userTable = require("../models/userTable");
const dotenv = require("dotenv").config();
const checkAdmin = async (req, res, next) => {
  const accesstoken = req.body.token;
  try {
    const admin = await axios.get(
      `https://${process.env.COMPANY_DOMAIN}/rest/user.admin.json?auth=${accesstoken}`
    );
    if (!admin.data.result) {
      const verifyAdmin = await userTable.findOne({
        where: {
          id: req.body.userId,
          isAdmin: true,
        },
      })
      // console.log(verifyAdmin, "verify");
      if (verifyAdmin) {
        req.role = "Admin";
      }
      // if(!verifyAdmin){
      //   return res.status(400).json({ msg: "user is not a admin" });
      // }
      next();
      // else {
      //   // console.log(admin.data.result == false);
      //   return res.status(400).json({ msg: "user is not a admin" });
      // }
    } else {
      req.role = "Admin";
      next();
      // return res.status(400).json({ msg: "user is not a admin" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "something went wrong",err});
  }
};

module.exports = checkAdmin;
