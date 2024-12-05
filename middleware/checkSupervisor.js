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
      if (superVisor.data.result[0].UF_HEAD == 0) {
        req.body.assignedTo = superVisor.data.result[0].ID;
      } else if (superVisor.data.result[0].UF_HEAD == req.body.userId) {
        req.role = "supervisor";
        const parentResponse = await axios.get(
          `https://${process.env.COMPANY_DOMAIN}/rest/department.get.json?ID=${superVisor.data.result[0].PARENT}&auth=${accessToken}`
        );
        console.log(parentResponse.data.result[0]);
        if (parentResponse.data.result[0]) {
          req.body.assignedTo = parentResponse.data.result[0].UF_HEAD;
        }
      } else {
        req.body.assignedTo = superVisor.data.result[0].UF_HEAD;
      }
    }
    console.log(req.body.assignedTo, "assignedTo...........");
    // else if(){
    //     req.body.assignedTo=  superVisor.data.result[0].UF_HEAD
    // }
    if (req.body.assignedTo == 0) {
      //if we will not find any supervisor then we will send the voucher to  parent head
      req.body.assignedTo = 1;
    }
    // return; //need to check why data is not assigning to thier supervisor when no team leader i there
    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = checkSupervisor;
