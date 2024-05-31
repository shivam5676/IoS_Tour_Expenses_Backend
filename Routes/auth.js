const express = require("express");
const { Login } = require("../Controllers/auth");
const routes = express.Router();
const dontenv = require("dotenv").config();
// const CLIENT_SECRET = "oZdDNROPloGD7ejfkJLtrlC0L6L3Z7n50xHEBAh4OX3QHcECI5";

// const CLIENT_ID = "local.6648983f0cc5d5.97469898";

// const CLIENT_SECRET="borh0rzwyFJ6VZcwKYTxweW4C0W4V6yq8ebR3iJBKhDibRy9mp"
// const CLIENT_ID="local.664b0f441b4be8.22121143"
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const CLIENT_ID = process.env.CLIENT_ID;
const axios = require("axios");
const path = require("path");
const querystring = require("querystring");
const userTable = require("../models/userTable");
const REDIRECT_URI = process.env.REDIRECT_URI;
// const COMPANY_DOMAIN = "oipl.bitrix24.in";
routes.post("/login", Login);

// Route for initiating the OAuth flow
// routes.get('/authorize', (req, res) => {

//     const queryParams = querystring.stringify({
//         response_type: 'code',
//         client_id: CLIENT_ID,
//         redirect_uri: REDIRECT_URI
//     });
//     res.redirect(`https://oipl.bitrix24.in/oauth/authorize?${queryParams}`);
// });

routes.post("/home", (req, res) => {
  //for bitrix redirecting
  res.sendFile(
    path.join(__dirname, "../", "../IoS_Tour_Expenses/build/index.html")
  );
});
routes.get("/home", (req, res) => {
  //for bitrix redirecting
  res.sendFile(
    path.join(__dirname, "../", "../IoS_Tour_Expenses/build/index.html")
  );
});

routes.get("/queryParams", async (req, res) => {
  console.log("env", process.env.CLIENT_SECRET);
  try {
    // const REDIRECT_URI = "http://localhost:3000/home";
    // const CLIENT_ID = "local.6648983f0cc5d5.97469898";
    // const CLIENT_ID = "local.664b0f441b4be8.22121143"; //gaurav
    const queryParams = querystring.stringify({
      response_type: "code",
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
    });
    res.status(200).json({ data: queryParams });
  } catch (error) {
    console.log(error);
  }
});

routes.get("/callback/:code", async (req, res) => {
  try {
    const { code } = req.params;

    // Exchange the authorization code for an access token
    const tokenResponse = await axios.get(
      `http://${process.env.COMPANY_DOMAIN}/oauth/token`,

      // `http://b24-awzvaa.bitrix24.in/oauth/token`,
      {
        params: {
          client_id: CLIENT_ID,
          grant_type: "authorization_code",
          client_secret: CLIENT_SECRET,
          redirect_uri: REDIRECT_URI,
          code: code,
          scope: "user",
        },
      }
    );
    if (tokenResponse) {
      const accesstoken = tokenResponse.data.access_token;
      const admin = await axios.get(
        `https://${process.env.COMPANY_DOMAIN}/rest/user.admin.json?auth=${accesstoken}`
      );
      console.log(admin);

      const userDetails = await axios.get(
        `https://${process.env.COMPANY_DOMAIN}/rest/user.current`,
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
          },
        }
      );
      console.log(tokenResponse.data.mobile, "..............");
      const userValid = await userTable.findOne({
        where: { id: tokenResponse.data.user_id },
      });

      // console.log(supervisor);
      // console.log(superVisor.data.result, tokenResponse.data.user_id,)

      if (!userValid) {
        const departments = userDetails.data.result.UF_DEPARTMENT;
        let supervisor = false;

        // Check if user is head of any department
        for (const deptId of departments) {
          const deptResponse = await axios.get(
            `https://${process.env.COMPANY_DOMAIN}/rest/department.get.json?ID=${deptId}&auth=${accesstoken}`
          );
          console.log(
            deptResponse.data.result[0].UF_HEAD,
            tokenResponse.data.user_id
          );
          const deptHead = deptResponse.data.result[0].UF_HEAD;
          if (deptHead == tokenResponse.data.user_id) {
            supervisor = true;
            break;
          }
        }

        try {
          const saveUser = await userTable.create({
            firstName: userDetails.data.result.NAME,
            lastName: userDetails.data.result.LAST_NAME,
            email: userDetails.data.result.EMAIL,
            mobile: userDetails.data.result.PERSONAL_MOBILE,
            isAdmin: admin.data.result || supervisor,
            designation: userDetails.data.result.WORK_POSITION,
            id: tokenResponse.data.user_id,
          });
          return res.status(200).json({
            data: {
              // ...tokenResponse.data,
              mobile: tokenResponse.data.mobile,
              domain: tokenResponse.data.domain,
              access_token: tokenResponse.data.access_token,
              refresh_token: tokenResponse.data.refresh_token,
              isAdmin: admin.data.result || supervisor,
              firstName: userDetails.data.result.NAME,
              lastName: userDetails.data.result.LAST_NAME,
              email: userDetails.data.result.EMAIL,
              mobile: userDetails.data.result.PERSONAL_MOBILE,
              designation: userDetails.data.result.WORK_POSITION,
            },
          });
        } catch (err) {
          return res.status(400).json({
            msg: "err while creating user...try again later ",
            response: err,
          });
        }
      }
      return res.status(200).json({
        data: {
          // ...tokenResponse.data,
          mobile: tokenResponse.data.mobile,
          domain: tokenResponse.data.domain,
          access_token: tokenResponse.data.access_token,
          refresh_token: tokenResponse.data.refresh_token,
          isAdmin: userValid.isAdmin,
          firstName: userValid.firstName,
          lastName: userValid.lastName,
          email: userDetails.data.result.EMAIL,
          mobile: userDetails.data.result.PERSONAL_MOBILE,
          designation: userValid.designation,
        },
      });
    }
  } catch (error) {
    console.error("Error:", error);
    // res.status(500).send('Error during authentication');
  }
});

routes.post("/check-token", async (req, res) => {
  const { domain, token } = req.body;
  console.log(domain);
  if (!domain || !token) {
    return res.status(400).json({ error: "Domain and token are required." });
  }

  try {
    const response = await axios.get(
      `https://${domain}/rest/user.current?auth=${token}`
    );
    console.log(response.data.result);
    if (response.data.result) {
      return res.status(200).json({ valid: true, user: response.data.result });
    } else {
      return res
        .status(400)
        .json({ valid: false, error: response.data.error_description });
    }
  } catch (error) {
    if (error.response && error.response.data) {
      return res
        .status(400)
        .json({ valid: false, error: error.response.data.error_description });
    }
    return res
      .status(500)
      .json({ valid: false, error: "An unknown error occurred." });
  }
});

routes.post("/refresh-token", async (req, res) => {
  const { refresh_token } = req.body;

  if (!refresh_token) {
    return res.status(400).json({ error: "Refresh token is required." });
  }

  const params = new URLSearchParams();
  params.append("grant_type", "refresh_token");
  params.append("client_id", process.env.CLIENT_ID);
  params.append("client_secret", process.env.CLIENT_SECRET);
  params.append("refresh_token", refresh_token);
  params.append("redirect_uri", process.env.REDIRECT_URI);

  try {
    const response = await axios.post(
      "https://oauth.bitrix.info/oauth/token/",
      params
    );
    const newAccessToken = response.data.access_token;
    const newRefreshToken = response.data.refresh_token;

    // Optionally, update your stored refresh token
    // e.g., save newRefreshToken to your database or environment variables

    return res
      .status(200)
      .json({ access_token: newAccessToken, refresh_token: newRefreshToken });
  } catch (error) {
    if (error.response && error.response.data) {
      if (error.response.data.error === "invalid_grant") {
        return res.status(400).json({
          error: "Invalid refresh token. Re-authentication required.",
        });
      }
      return res
        .status(400)
        .json({ error: error.response.data.error_description });
    }
    return res.status(500).json({ error: "An unknown error occurred." });
  }
});

module.exports = routes;
