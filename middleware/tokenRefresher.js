const { default: axios } = require("axios");

const dotenv = require("dotenv").config();

const TokenRefresher = async (req, res, next) => {
  const { refreshToken } = req.body;
  try {
    const tokenResponse = await axios.get(
      `http://${process.env.COMPANY_DOMAIN}/oauth/token`,

      // `http://b24-awzvaa.bitrix24.in/oauth/token`,
      {
        params: {
          client_id: process.env.CLIENT_ID,
          grant_type: "refresh_token",
          client_secret: process.env.CLIENT_SECRET,
          refresh_token: refreshToken,
        },
      }
    );
    // console.log({refresh_token:tokenResponse.data.refresh_token,access_token:tokenResponse.data.access_token});
    return res
      .status(200)
      .json({
        refresh_token: tokenResponse.data.refresh_token,
        access_token: tokenResponse.data.access_token,
      });
  } catch (err) {
    return res.status(400).json("something went wrong");
  }
};
module.exports = TokenRefresher;
