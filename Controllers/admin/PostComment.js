const { default: axios } = require("axios");
const Vouchers = require("../../models/VoucherTable");
const userTable = require("../../models/userTable");
const dontenv = require("dotenv").config();
const postComment = async (req, res) => {
  console.log("first");
  if (req.role != "Admin" && req.role != "paymentAdmin") {
    return res.status(400).json({ msg: "You are not a authorised user" });
  }
  if (!req.body.userId) {
    return res.status(400).json({ msg: "invalid user  ...." });
  }
  if (!req.body.comment || req.body.comment.length == 0) {
    return res.status(400).json({ msg: "please input text in comment  ...." });
  }

  const voucherId = req.body.voucherId;
  //   const userId=req.body.userId
  try {
    const voucherData = await Vouchers.findOne(
      //   { stausType: "Pending" },
      {
        where: { id: voucherId },
        include: [
          {
            model: userTable, // Associated model

            attributes: ["id", "firstName", "lastName"], // Fields from the Users table
          },
        ],
      }
    );

    
    const userInfo = await userTable.findOne({
      where: {
        id: req.body.userId,
      },
      attributes: ["firstName", "lastName", "id"],
    });
    const tourVoucherPersonName =
      voucherData?.user?.dataValues?.firstName +
      voucherData?.user?.dataValues?.lastName;

    const tourVoucherPersonId = voucherData?.user?.dataValues?.id;

    let chatTitle = `TourVoucher_Disputes (${voucherData.tourLocation}-${voucherData.tourDate})`;
    let entityId = `${tourVoucherPersonId}${voucherId}`;
    let entityType = `${voucherId}-chat`;

    //1. first iniate a chat im.chat.add use unique enity id and type  made them unique use user VOucherNoandUSerID as entity and type as chat
    if (voucherData?.chatGroup) {
      const response = await axios.post(
        `https://${process.env.COMPANY_DOMAIN}/rest/im.message.add`,
        {
          MESSAGE: req.body?.comment || "Default message content",

          auth: req.body.token,

          DIALOG_ID: `chat${voucherData.chatGroup}`, //append chat with chatgroup data
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
          DESCRIPTION: `Dear [b]${tourVoucherPersonName} [/b],\n\n

This group has been created to handle all your tour-related concerns. You can directly coordinate with the Voucher Handling Admin and other authorities for this tour only.\n\n

[b]Tour Details:[/b]\n
- [b]user name : [/b] ${tourVoucherPersonName}
- [b]Location :[/b] ${voucherData.tourLocation}\n
- [b]Creation Date :[/b] ${voucherData.tourDate}\n
- [b]Voucher ID :[/b] ${voucherData.id}\n\n

[b]Tour Voucher Handling Instructions[/b]\n\n
 [b] - User can Edit and delete Any Expense If Voucher Status is Pending.If voucher  status is accepted/rejected/closed then User can not edit or delete any expense.[/b]\n
 [b]- User can not add any New Expense after sending The voucher but existing entry can be editable.[/b]\n
 [b]- User can request to correct any data like Wrong DA to Admin or any other problems regarding this tour.[/b]\n
 [b]- Admin can edit the status of voucher and other data anytime.[/b]\n\n
Note - If this tour does not belong to you, please send a message  and forward this message to the HR department and report this error.\n

 [b]**Don't send message to any admin outside of this group regarding this tour Voucher.All of your tour related problems will be acknowleged  here only [/b] \n\n - [b]OMR INDIA OUTSOURCES PVT LTD[/b]`,

          MESSAGE: req.body.comment,
          USERS: [tourVoucherPersonId, req.body.userId],
          auth: req.body.token,
          ENTITY_ID: entityId,
          ENTITY_TYPE: entityType,
        }
      );

      //2.find chat id using this enity id and entiy type both should be unique at the time of adding chat
      const findChatGroup = await axios.post(
        `https://${process.env.COMPANY_DOMAIN}/rest/im.chat.get`,
        {
          auth: req.body.token,
          ENTITY_ID: entityId, //numerical only
          ENTITY_TYPE: entityType, //any type
        }
      );

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
