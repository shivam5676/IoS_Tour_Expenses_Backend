const Vouchers = require("../../models/VoucherTable");

const acceptVoucher = async (req, res) => {
  const voucherId = req.body.voucherId;
//   const userId=req.body.userId
  try {
    const updatedData = await Vouchers.findOne(
      //   { stausType: "Pending" },
      { where: { id: voucherId} }
    );
    await updatedData.update({ statusType: "Accepted" });
    console.log(updatedData);
    return res.status(200).json({ details: updatedData });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "something went wrong" });
  }
};
module.exports = acceptVoucher;
