const { default: axios } = require("axios");
const userTable = require("../models/userTable");

const TokenIsVAlid = async (req, res, next) => {
  const { domain, token } = req.body;
 
  if (!domain || !token) {
    return res.status(400).json({ error: "Domain and token are required." });
  }

  try {
    const response = await axios.get(
      `https://${domain}/rest/user.current?auth=${token}`
    );
 
    // if (response.data.result) {
    //   if (response.data.result.ID) {
    //     const getUser = await userTable.findOne({
    //       where: {
    //         id: response.data.result.ID,
    //       },
    //     });
    //     if (getUser) {
    //       req.body.userId = response.data.result.ID;
    //     }
    //   } else {
    //     req.body.userId = undefined;
    //   }
    //   req.body.UF_Department_Id = response.data.result.UF_DEPARTMENT[0];
    //   // req.role=
    //   // console.log("hello");

        return res.status(200).json({ valid: true });
    // } else {
    //   return res
    //     .status(400)
    //     .json({ valid: false, error: response.data.error_description });
    // }
  } catch (error) {
    console.log(error,"..>")
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
module.exports = TokenIsVAlid;
