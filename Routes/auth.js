const express = require("express");
const { Login } = require("../Controllers/auth");
const routes = express.Router();
const CLIENT_SECRET = "oZdDNROPloGD7ejfkJLtrlC0L6L3Z7n50xHEBAh4OX3QHcECI5";
const CLIENT_ID = "local.6648983f0cc5d5.97469898";
const axios = require("axios");
const path = require("path");
const querystring = require("querystring");
const REDIRECT_URI = "http://localhost:3000/home";
const COMPANY_DOMAIN = "oipl.bitrix24.in";
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

routes.post('/home', (req, res) => {  //for bitrix redirecting
  res.sendFile(path.join(__dirname, "../", "../IoS_Tour_Expenses/build/index.html"));
});
routes.get('/home', (req, res) => {  //for bitrix redirecting
  res.sendFile(path.join(__dirname, "../", "../IoS_Tour_Expenses/build/index.html"));
});

// routes.get('/', (req, res) => {  //for bitrix redirecting
//     res.sendFile(path.join(__dirname, "../", "../IoS_Tour_Expenses/build/index.html"));
// });

// routes.get('/callback', async (req, res) => {

//     try {
//         // const queryParams = querystring.stringify({
//         //     response_type: 'code',
//         //     client_id: "local.6648983f0cc5d5.97469898",
//         //     redirect_uri: "http://localhost:3000/home"
//         // });
//         // const codeResponse = await axios.post(`https://oipl.bitrix24.in/oauth/authorize?${queryParams}`);
//         const { code } = req.query;

//         // Exchange the authorization code for an access token
//         const tokenResponse = await axios.post(`https://oipl.bitrix24.in/oauth/token`, querystring.stringify({
//             grant_type: 'authorization_code',
//             client_id: "local.6648983f0cc5d5.97469898",
//             client_secret: "oZdDNROPloGD7ejfkJLtrlC0L6L3Z7n50xHEBAh4OX3QHcECI5",
//             redirect_uri: "http://localhost:3000/home",
//             code: code
//         }), {
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             }
//         });
//         console.log(tokenResponse)
//         const accessToken = tokenResponse.data.access_token;
//         const refreshToken = tokenResponse.data.refresh_token;

//         // Store the tokens in the session
//         req.session.accessToken = accessToken;
//         req.session.refreshToken = refreshToken;

//         // Redirect to the main page or wherever you want after login
//         res.redirect('/dashboard');
//     } catch (error) {
//         console.error('Error:', error);
//         // res.status(500).send('Error during authentication');
//     }
// });



routes.get('/queryParams', async (req, res) => {
  try {
    const REDIRECT_URI = 'http://localhost:3000/home';
    const CLIENT_ID = "local.6648983f0cc5d5.97469898";
    const queryParams = querystring.stringify({
      response_type: 'code',
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI
    });
    res.status(200).json({ data: queryParams })
  } catch (error) {
    console.log(error)
  }
})

// routes.get('/callback/:code', async (req, res) => {

//   try {
//     const { code } = req.params;

//     // Exchange the authorization code for an access token
//     const tokenResponse = await axios.get(`http://oipl.bitrix24.in/oauth/token`, {
//       params: {
//         client_id: CLIENT_ID,
//         grant_type: 'authorization_code',
//         client_secret: CLIENT_SECRET,
//         redirect_uri: REDIRECT_URI,
//         code: code,
//         scope: 'user'
//       }
//     });
//     console.log(tokenResponse.data)

//     // Send the token response data as JSON
//     res.status(200).json({ data: tokenResponse.data });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).send('Error during authentication');
//   }

// });
routes.get("/callback/:code", async (req, res) => {
  try {
    const { code } = req.params;

    // Exchange the authorization code for an access token
    const tokenResponse = await axios.get(
      `http://oipl.bitrix24.in/oauth/token`,
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
        `https://oipl.bitrix24.in/rest/user.admin.json?auth=${accesstoken}`
      );
      console.log(admin);
      const userDetails = await axios.get(
        `https://oipl.bitrix24.in/rest/user.current`,
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
          },
        }
      );
      console.log(userDetails);
      return res.status(200).json({
        data: {
          ...tokenResponse.data,
          admin: admin.data.result,
          firstName: userDetails.data.result.NAME,
          lastName: userDetails.data.result.LAST_NAME,
          email: userDetails.data.result.EMAIL,
          mobile: userDetails.data.result.PERSONAL_MOBILE,
          designation: userDetails.data.result.WORK_POSITION,
        },
      });
    }
    // const tokenResponse = await axios.post(`https://oipl.bitrix24.in/oauth/token`, querystring.stringify({
    //     grant_type: 'authorization_code',
    //     client_id: "local.6648983f0cc5d5.97469898",
    //     client_secret: "oZdDNROPloGD7ejfkJLtrlC0L6L3Z7n50xHEBAh4OX3QHcECI5",
    //     redirect_uri: "http://localhost:3000/home",
    //     code: code
    // }), {
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //     }
    // });
    // console.log(tokenResponse)
    // const accessToken = tokenResponse.data.access_token;
    // const refreshToken = tokenResponse.data.refresh_token;

    // // Store the tokens in the session
    // req.session.accessToken = accessToken;
    // req.session.refreshToken = refreshToken;

    // // Redirect to the main page or wherever you want after login
    // res.redirect('/dashboard');
  } catch (error) {
    console.error("Error:", error);
    // res.status(500).send('Error during authentication');
  }
});

routes.post('/check-token', async (req, res) => {
  const { domain, token } = req.body;

  if (!domain || !token) {
    return res.status(400).json({ error: 'Domain and token are required.' });
  }

  try {
    const response = await axios.get(`https://${domain}/rest/user.current?auth=${token}`);
    if (response.data.result) {
      return res.status(200).json({ valid: true, user: response.data.result });
    } else {
      return res.status(400).json({ valid: false, error: response.data.error_description });
    }
  } catch (error) {
    if (error.response && error.response.data) {
      return res.status(400).json({ valid: false, error: error.response.data.error_description });
    }
    return res.status(500).json({ valid: false, error: 'An unknown error occurred.' });
  }
});

routes.post('/refresh-token', async (req, res) => {
  const { refresh_token } = req.body;

  if (!refresh_token) {
    return res.status(400).json({ error: 'Refresh token is required.' });
  }

  const params = new URLSearchParams();
  params.append('grant_type', 'refresh_token');
  params.append('client_id', process.env.CLIENT_ID);
  params.append('client_secret', process.env.CLIENT_SECRET);
  params.append('refresh_token', refresh_token);
  params.append('redirect_uri', process.env.REDIRECT_URI);

  try {
    const response = await axios.post('https://oauth.bitrix.info/oauth/token/', params);
    const newAccessToken = response.data.access_token;
    const newRefreshToken = response.data.refresh_token;

    // Optionally, update your stored refresh token
    // e.g., save newRefreshToken to your database or environment variables

    return res.status(200).json({ access_token: newAccessToken, refresh_token: newRefreshToken });
  } catch (error) {
    if (error.response && error.response.data) {
      if (error.response.data.error === 'invalid_grant') {
        return res.status(400).json({ error: 'Invalid refresh token. Re-authentication required.' });
      }
      return res.status(400).json({ error: error.response.data.error_description });
    }
    return res.status(500).json({ error: 'An unknown error occurred.' });
  }
});


module.exports = routes;
