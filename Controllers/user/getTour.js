const Vouchers = require("../../models/VoucherTable");

const getTour = async(req, res) => {
console.log(req.body);

  if (!req.body.userId) {
    return res.status(400).json({ msg: "invalid user...." });
  }
  try {
    const vouchers =await Vouchers.findAll({
 
      userId: req.body.userId,
      statusType:"Created"
      
    });
    
    if (vouchers.length==0) {
      return res
        .status(400)
        .json({ msg: "voucher not created........plz try again later" });
    }
    return res.status(200).json({ vouchers: vouchers });
  } catch (err) {
    return res.status(40).json({ msg: "internal server problem .........." });
  }
};
module.exports = getTour;
