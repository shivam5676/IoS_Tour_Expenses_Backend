const { default: axios } = require("axios");
const dontenv = require("dotenv").config();
const createBitrixGroup = async (
  chatTitle,
  tourVoucherPersonName,
  voucherData,
  tourVoucherPersonId,
  comment,
  token,
  entityId,
  entityType,
  OWNER_ID
) => {
  try {
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
    
     [b]**Don't send message to any admin outside of this group regarding this tour Voucher.All of your tour related problems will be acknowleged  here only [/b] \n\n - [b]Voucher Management System (VMS)[/b]     [b][[OMR INDIA OUTSOURCES PVT LTD]][/b]`,

        MESSAGE:
          comment ||
          "Please review my voucher and let me tell if you need more data about expenses or any other thing",
        USERS: [OWNER_ID, tourVoucherPersonId],
        auth: token,
        ENTITY_ID: entityId,
        ENTITY_TYPE: entityType,
        // OWNER_ID:1,
      }
    );
    return chatData;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = createBitrixGroup;
