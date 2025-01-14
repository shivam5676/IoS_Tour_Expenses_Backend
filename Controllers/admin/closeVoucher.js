const { default: axios } = require("axios");
const Vouchers = require("../../models/VoucherTable");
const sendMessageToGroup = require("../../services/sendMEssageToGRoup");
const dotenv = require("dotenv").config();
const closeVoucher = async (req, res, next) => {
  const voucherId = req.body.voucherId;
  try {
    const getVoucher = await Vouchers.findOne(
      //   { stausType: "Pending" },
      { where: { id: voucherId } }
    );
    if (!getVoucher) {
      return res.status(400).json({
        msg: "unable to find the voucher in database ...try again or contact the adminstrator ",
      });
    }
    const response = await getVoucher.update({
      statusType: "Closed",
    });
    await sendMessageToGroup({
      token: req.body.token,
      message: `[b]
      Your Voucher has been Reviewed and Verified by me ,Now You can Contact me For Payment Related Process.[/b]\n\n\n [b]note*: I am closing The Voucher ,If You finds Any error in expenses or any other data Then You can Contact Tour Voucher Admin.They can help you to fix the error.[/b]`,
      groupID: getVoucher.chatGroup,
    });

    return res.status(200).json({ msg: "voucher successfully closed..." });
  } catch (error) {
    return res.status(500).json({ msg: "something went wrong" });
  }
};
module.exports = closeVoucher;
