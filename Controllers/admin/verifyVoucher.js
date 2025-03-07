const { default: axios } = require("axios");
const VouchersDescription = require("../../models/VoucherDescription");
const Vouchers = require("../../models/VoucherTable");
const assignedVoucher = require("../../models/assignedVoucher");
const createBitrixGroup = require("../../services/createBitrixGroup");
const userTable = require("../../models/userTable");
const { where } = require("sequelize");
const sendMessageToGroup = require("../../services/sendMEssageToGRoup");

const VerifyVoucher = async (req, res) => {
  const {
    purpose,
    arrivalDate,
    departureDate,
    transportArrival,
    transportDeparture,
    arrivalTime,
    departureTime,
    advanceCash,
    dailyAllowance,
    voucherId,
    userId,
  } = req.body;

  if (!voucherId) {
    return res.status(400).json({ msg: "voucherId is invalid" });
  }
  if (!userId) {
    return res.status(400).json({ msg: "userId is invalid" });
  }
  try {
    const voucherData = await Vouchers.findOne(
      //   { stausType: "Pending" },
      {
        where: { id: voucherId, statusType: "Pending" },
        // include: [
        //   {
        //     model: userTable, // Associated model

        //     attributes: ["id", "firstName", "lastName"], // Fields from the Users table
        //   },
        // ],
      }
    );

    if (!voucherData) {
      return res.status(400).json({
        msg: "voucher data not found or voucher status is not pending",
      });
    }
    const findAssignedVoucher = await assignedVoucher.findOne({
      where: {
        status: "Pending",
        assignedTo: req.body.userId,
        VoucherId: voucherId,
      },
    });
    if (!findAssignedVoucher) {
      return res.status(400).json({
        msg: "this voucher is not assigned to you so you can not perform this action...",
      }); //if voucher is not assigned
    }
    await findAssignedVoucher.update({
      status: "Accepted",
    });
    const assigned = await assignedVoucher.create({
      status: "Pending",
      assignedTo: req.body.assignedTo,
      VoucherId: voucherId,
      userId: voucherData.userId,
    });

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
              "fields[DESCRIPTION]": ` I hope this message finds you well.I am writing to request your review and approval for the Tour Voucher with ID ${voucherId}. Please carefully examine the voucher details and the associated expenses.If tou need any biilss and other expenses related data then you can use comment only option . If you find any discrepancies or errors in the expenses or their supporting documents, I encourage you to  reject the voucher accordingly.You can access the tour voucher on the Bitrix website under the following path: Applications > Market > (:more) > Tour Voucher. Additionally, it is available at the following link: https://tourvoucher.is10live.com/.
                 It is crucial to perform a thorough check of the voucher.  If any expense entry is wrong then you can guide the user for corrceting that , If any suspicious activity is detected please be advised that strict action will be taken.`,
              "fields[RESPONSIBLE_ID]": nextUserId,
            },
          }
        );
      } catch (error) {
        // console.error("Error sending approval request:", error);
        throw error;
      }
    }
    if (req.body.assignedTo) {
      sendApprovalRequest(req.body.userId, req.body.assignedTo, voucherId);
      const addUSerResponse = await axios.post(
        `https://${process.env.COMPANY_DOMAIN}/rest/im.chat.user.add`,
        {
          auth: req.body.token,

          DIALOG_ID: `chat${voucherData.chatGroup}`, //append chat with chatgroup data
          USERS: [req.body.assignedTo], //add new user who will join the group
        }
      );
      await sendMessageToGroup({
        token: req.body.token,
        message: `[b]Your voucher has been verified by me and forwarded to the Payment handling Admin for final Approval  of voucher expenses  .\n once Voucher And Expenses Will be verified then voucher will be send to the final step of payment allotement  .[/b]`,
        groupID: voucherData.chatGroup,
      });
      // const chatTitle=`TourVoucher_Disputes (${voucherData.tourLocation}-${voucherData.tourDate})`
      //   const tourVoucherPersonName =
      //     voucherData?.user?.dataValues?.firstName +
      //     voucherData?.user?.dataValues?.lastName;

      //   const tourVoucherPersonId = voucherData?.user?.dataValues?.id;

      //   let chatTitle = `TourVoucher_Disputes (${voucherData.tourLocation}-${voucherData.tourDate})`;
      //   let entityId = `${tourVoucherPersonId}${voucherId}`;
      //   let entityType = `${voucherId}-chat`;
      //   const token = req.body.token;
      //   const OWNER_ID = req.body.assignedTo;
      //   const comment = null;
      //   const chatGRoupData = await createBitrixGroup(
      //     chatTitle,
      //     tourVoucherPersonName,
      //     voucherData,
      //     tourVoucherPersonId,
      //     comment,
      //     token,
      //     entityId,
      //     entityType,
      //     OWNER_ID
      //   );
      //   const findChatGroup = await axios.post(
      //     `https://${process.env.COMPANY_DOMAIN}/rest/im.chat.get`,
      //     {
      //       auth: req.body.token,
      //       ENTITY_ID: entityId, //numerical only
      //       ENTITY_TYPE: entityType, //any type
      //     }
      //   );

      //   if (findChatGroup?.data?.result?.ID) {
      //     const updatedData = await voucherData.update({
      //       comment: req.body.comment,
      //       sender: req.body.userId,
      //       chatGroup: findChatGroup.data.result.ID,
      //     });
      //   }
    }

    return res.status(200).json({ details: voucherData });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "something went wrong", err: err });
  }
};
module.exports = VerifyVoucher;
