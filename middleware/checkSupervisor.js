const { default: axios } = require("axios");
const dotenv = require("dotenv").config();

const checkSupervisor = async (req, res, next) => {
  const accessToken = req.body.token;
  const userId = req.body.userId;
  const DepartMentId = req.body.UF_Department_Id;
  // console.log(userId);
  try {
    const superVisor = await axios.get(
      `https://${process.env.COMPANY_DOMAIN}/rest/department.get.json?ID=${DepartMentId}&auth=${accessToken}`
    );
    if (!superVisor.data.result) {
      console.log("no supervisor ");
      return;
    }
    console.log("object", req.body.userId);
    console.log(superVisor.data.result[0], userId);
    if (superVisor.data.result[0].UF_HEAD) {
      if (superVisor.data.result[0].UF_HEAD == req.body.userId) {
        const parentResponse = await axios.get(
          `https://${process.env.COMPANY_DOMAIN}/rest/department.get.json?ID=${superVisor.data.result[0].PARENT}&auth=${accessToken}`
        );
        console.log(parentResponse.data.result[0]);
        req.body.assignedTo = parentResponse.data.result[0].UF_HEAD;
      } else {
        req.body.assignedTo = superVisor.data.result[0].UF_HEAD;
      }
    }
    // else if(){
    //     req.body.assignedTo=  superVisor.data.result[0].UF_HEAD
    // }

    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = checkSupervisor;
