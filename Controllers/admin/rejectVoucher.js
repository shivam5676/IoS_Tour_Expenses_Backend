const { default: axios } = require("axios");
const Vouchers = require("../../models/VoucherTable");
const assignedVoucher = require("../../models/assignedVoucher");
const sendMessageToGroup = require("../../services/sendMEssageToGRoup");
const dotenv = require("dotenv").config();
const rejectVoucher = async (req, res) => {
  if (req.role != "Admin" && req.role != "paymentAdmin") {
    return res.status(400).json({ msg: "You are not a authorised user" });
  }
  const voucherId = req.body.voucherId;
  if (!req.body.userId) {
    return res.status(400).json({ msg: "invalid user  ...." });
  }
  try {
    const getAssignedVoucher = await assignedVoucher.findOne({
      where: {
        assignedTo: req.body.userId,
        status: "Pending",
        VoucherId: voucherId,
      },
    });
    const updateAssignedVoucher = await getAssignedVoucher.update({
      status: "Rejected",
    });

    if (updateAssignedVoucher) {
      const updatedData = await Vouchers.findOne(
        //   { stausType: "Pending" },
        { where: { id: voucherId } }
      );
      if (!req.body.assignedTo) {
        await updatedData.update({
          statusType: "Rejected",
          comment: req.body.comment,
          sender: req.body.userId,
          assignedTo: null,
        });
      } else {
        await assignedVoucher.create({
          assignedTo: updateAssignedVoucher.userId,
          status: "Rejected",
          VoucherId: voucherId,
          userId: updateAssignedVoucher.userId,
        });
        await updatedData.update({
          statusType: "Rejected",
          comment: req.body.comment,
          sender: req.body.userId,
          assignedTo: null,
        });
      }
      await sendMessageToGroup({
        token: req.body.token,
        message: `[b]Your voucher has been Rejected by me.[/b]\n\n Reason: ${
          req.body.comment || "not provided"
        }\n\n
        -If you still wish to update incorrect data or entries, you can request me to change the voucher status to Pending. After that, I will verify the voucher again for approval.`,
        groupID: updatedData.chatGroup,
      });
      // const messageResponse = await axios.post(
      //   `https://${process.env.COMPANY_DOMAIN}/rest/im.message.add`,
      //   {
      //     MESSAGE: `[b]Your voucher has been Rejected by me.[/b]\n\n
      //     Reason:${req.body.comment}\n\n
      //     -If you still wish to update incorrect data or entries, you can request me to change the voucher status to Pending. After that, I will verify the voucher again for approval.`,

      //     auth: req.body.token,

      //     DIALOG_ID: `chat${updatedData.chatGroup}`, //append chat with chatgroup data
      //   }
      // );
      return res.status(200).json({ details: updatedData });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "something went wrong" });
  }
};
module.exports = rejectVoucher;
