const express = require("express");
const { Login } = require("../Controllers/auth");
const routes = express.Router();
const CLIENT_SECRET = "oZdDNROPloGD7ejfkJLtrlC0L6L3Z7n50xHEBAh4OX3QHcECI5"
const CLIENT_ID = "local.6648983f0cc5d5.97469898"
const axios = require("axios");
const path = require("path");
const querystring = require('querystring');
const REDIRECT_URI = 'http://localhost:3000/home';
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

// routes.post('/home', (req, res) => {  //for bitrix redirecting
//     res.sendFile(path.join(__dirname, "../", "../IoS_Tour_Expenses/build/index.html"));
// });

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




routes.get('/callback/:code', async (req, res) => {

    try {
        // const queryParams = querystring.stringify({
        //     response_type: 'code',
        //     client_id: "local.6648983f0cc5d5.97469898",
        //     redirect_uri: "http://localhost:3000/home"
        // });
        // const codeResponse = await axios.post(`https://oipl.bitrix24.in/oauth/authorize?${queryParams}`);
        const { code } = req.params;
        console.log(code)
        // Exchange the authorization code for an access token
        const response = await axios.get(`http://oipl.bitrix24.in/oauth/token/?client_id=${CLIENT_ID}&grant_type=authorization_code&client_secret=${CLIENT_SECRET}&redirect_uri=${REDIRECT_URI}&code=${code}&scope=user`)
        console.log(response)
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
        res.status(200).json({ data: response.data });
    } catch (error) {
        console.error('Error:', error);
        // res.status(500).send('Error during authentication');
    }
});


module.exports = routes;
