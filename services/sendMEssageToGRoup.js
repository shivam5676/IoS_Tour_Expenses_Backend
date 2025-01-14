const { default: axios } = require("axios");
const dontenv = require("dotenv").config();
const sendMessageToGroup = async (data) => {
  try {
    const messageResponse = await axios.post(
      `https://${process.env.COMPANY_DOMAIN}/rest/im.message.add`,
      {
        MESSAGE: data.message,

        auth: data.token,

        DIALOG_ID: `chat${data.groupID}`, //append chat with chatgroup data
      }
    );
    
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to send message to group: ${error.message}`);
  }
};
module.exports = sendMessageToGroup;
