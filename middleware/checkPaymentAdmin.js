const userTable = require("../models/userTable");

module.exports = async (req, res, next) => {
  try {
 
    const verifyPAymentAdmin = await userTable.findOne({
      where: {
        id: req.body.userId,
        paymentAdmin: true,
      },
    });

    if (!verifyPAymentAdmin) {
      req.role = "";
    } else {
      req.role = "paymentAdmin";
    }

    next();
  } catch (err) {
    return res.status(400).json({ msg: "Something went wrong ", err: err });
  }
};
