const { default: axios } = require("axios");
const Vouchers = require("../../models/VoucherTable");
const assignedVoucher = require("../../models/assignedVoucher");
const VouchersDescription = require("../../models/VoucherDescription");
const dotenv = require("dotenv").config();

const acceptVoucher = async (req, res) => {
  const voucherId = req.body.voucherId;
  if (!req.body.userId) {
    return res.status(400).json({ msg: "invalid user  ...." });
  }


  // Function to get supervisor information

  try {
    const getAssignedVoucher = await assignedVoucher.findOne({
      where: {
        assignedTo: req.body.userId,
        status: "Pending",
        VoucherId: voucherId,
      },
    });
    const updateAssignedVoucher = await getAssignedVoucher.update({
      status: "Accepted",
    });

    if (updateAssignedVoucher) {
      if (req.body.dailyAllowance) {
        const voucherDetails = await VouchersDescription.findOne({
          where: { voucherId: req.body.voucherId },
        });
        await voucherDetails.update({
          dailyAllowance: +req.body.dailyAllowance,
        });
      }
      const updatedData = await Vouchers.findOne(
        //   { stausType: "Pending" },
        { where: { id: voucherId } }
      );

      if (!req.body.assignedTo) {
        if (!req.body.AccountDepartment) {
          return res
            .status(400)
            .json({ msg: "please select Account department field" });
        }
        console.log(req.body.assignedName);
        await updatedData.update({
          statusType: "Accepted",
          comment: req.body.comment,
          sender: req.body.userId,
          assignedTo: req.body.AccountDepartment,
          assignedName: req.body.assignedName,
        });
      } else {
        await assignedVoucher.create({
          assignedTo: req.body.assignedTo,

          status: "Pending",
          VoucherId: voucherId,
          userId: updateAssignedVoucher.userId,
        });
        await updatedData.update({
          statusType: "Pending",
          comment: req.body.comment,
          sender: req.body.userId,
          // assignedTo: req.body.assignedTo,
        });
      }
      async function sendApprovalRequest(currentUserid, nextUserId, voucherId) {
        try {
          // Send notification to the next user
          await axios.post(
            `https://${process.env.COMPANY_DOMAIN}/rest/tasks.task.add`,
            null,
            {
              params: {
                auth: req.body.token,
                "fields[TITLE]": `Approval Request for Voucher ${voucherId}`,
                "fields[DESCRIPTION]": `Please review and approve the Tour voucher with ID ${voucherId},Reject the Tour Voucher If You find any error in Expenses and thier bills`,
                "fields[RESPONSIBLE_ID]": nextUserId,
              },
            }
          );

          // Send notification to the origin user
          // await axios.post("https://your-bitrix24-url/rest/feed.item.add", {
          //   auth: "your-access-token",
          //   POST_TITLE: `Your Approval Request for Voucher ${voucherId}`,
          //   POST_MESSAGE: `Your approval request for the voucher with ID ${voucherId} has been sent to ${nextUserId}`,
          //   POST_SUB_TITLE: "Voucher Approval",
          //   POST_FEED: "tasks",
          //   DESTINATION: [{ TYPE: "USER", ID: currentUserid }],
          // });

          console.log("Approval request sent successfully");
        } catch (error) {
          // console.error("Error sending approval request:", error);
          throw error;
        }
      }
      if (req.body.assignedTo) {
        sendApprovalRequest(req.body.userId, req.body.assignedTo, voucherId);
      }
      console.log(updatedData);
      return res.status(200).json({ details: updatedData });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "something went wrong" });
  }
};
module.exports = acceptVoucher;
