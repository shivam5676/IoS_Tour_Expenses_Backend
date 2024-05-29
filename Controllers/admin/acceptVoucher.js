const { default: axios } = require("axios");
const Vouchers = require("../../models/VoucherTable");
const dotenv = require("dotenv").config();

const acceptVoucher = async (req, res) => {
  const voucherId = req.body.voucherId;
  // const accessToken = req.body.token;
  // const userId = req.body.userId;
  // const DepartMentId= req.body.UF_Department_Id
  // // console.log(userId);
  // try {
  //   const superVisor = await axios.get(
  //     `https://${process.env.COMPANY_DOMAIN}/rest/department.get.json?ID=${DepartMentId}&auth=${accessToken}`
  //   );
  //   console.log(superVisor.data.result);
  // } catch (err) {
  //   console.log(err);
  // }
  
  

  // Function to get supervisor information

  try {
    const updatedData = await Vouchers.findOne(
      //   { stausType: "Pending" },
      { where: { id: voucherId } }
    );
    await updatedData.update({
      statusType: "Accepted",
      comment: req.body.comment,
      sender:req.body.userId
    });
    console.log(updatedData);
    return res.status(200).json({ details: updatedData });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "something went wrong" });
  }
};
module.exports = acceptVoucher;
