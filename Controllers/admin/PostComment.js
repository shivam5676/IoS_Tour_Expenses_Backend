const { default: axios } = require("axios");
const Vouchers = require("../../models/VoucherTable");
const userTable = require("../../models/userTable");
const dontenv = require("dotenv").config();
const postComment = async (req, res) => {
  if (req.role != "Admin" && req.role != "supervisor") {
    return res.status(400).json({ msg: "You are not a authorised user" });
  }
  if (!req.body.userId) {
    return res.status(400).json({ msg: "invalid user  ...." });
  }
  const voucherId = req.body.voucherId;
  //   const userId=req.body.userId
  try {
    const voucherData = await Vouchers.findOne(
      //   { stausType: "Pending" },
      { where: { id: voucherId } }
    );

    const userInfo = await userTable.findOne({
      where: {
        id: req.body.userId,
      },
      attributes: ["firstName", "lastName", "chatGroup", "id"],
    });

    let chatTitle = `TourVoucher_Disputes (${voucherData.tourLocation}-${voucherData.tourDate})`;
    let entityId = `${userInfo.id}${voucherId}`;
    let entityType = `${voucherId}-chat`;

    //1. first iniate a chat im.chat.add use unique enity id and type  made them unique use user VOucherNoandUSerID as entity and type as chat
    if (voucherData.chatGroup) {
      const response = await axios.post(
        `https://${process.env.COMPANY_DOMAIN}/rest/im.message.add`,
        {
          MESSAGE: req.body.comment || "Default message content",

          auth: req.body.token,

          DIALOG_ID: `chat${voucherData.chatGroup}`,
        }
      );
      await voucherData.update({
        comment: req.body.comment,
        sender: req.body.userId,
      });
    } else {
      const chatData = await axios.post(
        `https://${process.env.COMPANY_DOMAIN}/rest/im.chat.add`,
        {
          TYPE: "CHAT",
          TITLE: chatTitle,
          DESCRIPTION: `Dear ${userInfo.firstName} ${userInfo.lastName},

This group has been created to handle all your tour-related concerns. You can directly coordinate with the Voucher Handling Admin for this tour only.

**Tour Details**:
- **Location**: ${voucherData.tourLocation}
- **Creation Date**: ${voucherData.tourDate}
- **Voucher ID**: ${voucherData.id}

If this tour does not belong to you, please send a message to the HR department and report this error.`,
          MESSAGE: req.body.comment,
          USERS: [8, 1],
          auth: req.body.token,
          ENTITY_ID: entityId,
          ENTITY_TYPE: entityType,
        }
      );

      //2.find chat id using this enity id and type
      const findChatGroup = await axios.post(
        `https://${process.env.COMPANY_DOMAIN}/rest/im.chat.get`,
        {
          auth: req.body.token,
          ENTITY_ID: entityId, //numerical only
          ENTITY_TYPE: entityType, //any type
        }
      );
      console.log(findChatGroup.data.result, "fcg");
      if (findChatGroup?.data?.result?.ID) {
        const updatedData = await voucherData.update({
          comment: req.body.comment,
          sender: req.body.userId,
          chatGroup: findChatGroup.data.result.ID,
        });
      }
    }

    return res.status(200).json({ details: voucherData, sender: userInfo });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "something went wrong" });
  }
};
module.exports = postComment;
