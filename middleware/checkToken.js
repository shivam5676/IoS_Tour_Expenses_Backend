const { default: axios } = require("axios");

const checkToken = async (req, res, next) => {
  const { domain, token } = req.body;
console.log(domain,token)
  if (!domain || !token) {
    return res.status(400).json({ error: "Domain and token are required." });
  }

  try {
    const response = await axios.get(
      `https://${domain}/rest/user.current?auth=${token}`
    );
    console.log(response.data.result,"=========>");
    if (response.data.result) {
        req.body.userId=(response.data.result.ID)
        // req.role=
        // console.log("hello");
      next();
      //   return res.status(200).json({ valid: true, user: response.data.result });
    } else {
      return res
        .status(400)
        .json({ valid: false, error: response.data.error_description });
    }
  } catch (error) {
    // console.log(error)
    if (error.response && error.response.data) {
      return res
        .status(400)
        .json({ valid: false, error: error.response.data.error_description });
    }

    return res
      .status(500)
      .json({ valid: false, error: "An unknown error occurred." });
  }
};
module.exports = checkToken;
