const { default: axios } = require("axios");
const VouchersDescription = require("../../models/VoucherDescription");
const Vouchers = require("../../models/VoucherTable");
const assignedVoucher = require("../../models/assignedVoucher");

const addTourDetails = async (req, res) => {
  const {
    purpose,
    arrivalDate,
    departureDate,
    transportArrival,
    transportDeparture,
    arrivalTime,
    departureTime,
    advanceCash,
    dailyAllowance,
    voucherId,
    userId,
  } = req.body;

  if (purpose.length == 0) {
    return res.status(400).json({ msg: "purpose field is empty" });
  }
  if (arrivalDate.length == 0) {
    return res.status(400).json({ msg: "arrivalDate field is empty" });
  }
  if (departureDate.length == 0) {
    return res.status(400).json({ msg: "departureDate field is empty" });
  }
  if (departureTime.length == 0) {
    return res.status(400).json({ msg: "departure time field is empty" });
  }
  if (arrivalTime.length == 0) {
    return res.status(400).json({ msg: "arrival time field is empty" });
  }

  if (isNaN(+advanceCash)) {
    return res.status(400).json({ msg: "advance cash should be only number" });
  }
  if (transportArrival.length == 0) {
    return res.status(400).json({ msg: "transport Arrival field is empty" });
  }
  if (transportDeparture.length == 0) {
    return res.status(400).json({ msg: "transport Departure field is empty" });
  }
  if (!voucherId) {
    return res.status(400).json({ msg: "voucherId is invalid" });
  }
  if (!userId) {
    return res.status(400).json({ msg: "userId is invalid" });
  }
  try {
    const savedDetails = await VouchersDescription.create({
      purpose,
      arrivalDate,
      departureDate,
      transportArrival,
      transportDeparture,
      arrivalTime,
      departureTime,
      advanceCash,
      dailyAllowance,
      VoucherId: voucherId,
      userId,
    });
    if (!savedDetails) {
      return res
        .status(400)
        .json({ msg: "description could not saved...check all fields " });
    }
    const updatedData = await Vouchers.findOne(
      //   { stausType: "Pending" },
      { where: { id: voucherId, userId: +userId } }
    );
    // if (!req.body.assignedTo) {
    //   return res
    //     .status(400)
    //     .json({ msg: "something went wrong...contact administration " }); //if therreis problem in bitrix hierrachy
    // }
    await updatedData.update({
      statusType: req.body.assignedTo ? "Pending" : "Accepted",
    });
    const assigned = assignedVoucher.create({
      status: req.body.assignedTo ? "Pending" : "Accepted",
      assignedTo: req.body.assignedTo || req.body.userId,
      VoucherId: voucherId,
      userId: req.body.userId,
    });

    async function sendApprovalRequest(currentUserid, nextUserId, voucherId) {
      try {
        // Send notification to the next user
        await axios.post(
          `https://${process.env.COMPANY_DOMAIN}/rest/tasks.task.add`,
          null,
          {
            params: {
              auth: req.body.token,
              "fields[TITLE]": `Approval Request for Voucher ${voucherId}`,
              "fields[DESCRIPTION]": ` I hope this message finds you well.I am writing to request your review and approval for the Tour Voucher with ID ${voucherId}. Please carefully examine the voucher details and the associated expenses.If tou need any biilss and other expenses related data then you can use comment only option . If you find any discrepancies or errors in the expenses or their supporting documents, I encourage you to  reject the voucher accordingly.You can access the tour voucher on the Bitrix website under the following path: Applications > Market > (:more) > Tour Voucher. Additionally, it is available at the following link: https://tourvoucher.is10live.com/.
                 It is crucial to perform a thorough check of the voucher.  If any expense entry is wrong then you can guide the user for corrceting that , If any suspicious activity is detected please be advised that strict action will be taken.`,
              "fields[RESPONSIBLE_ID]": nextUserId,
            },
          }
        );

        // Send notification to the origin user
        // await axios.post("https://your-bitrix24-url/rest/feed.item.add", {
        //   auth: "your-access-token",
        //   POST_TITLE: `Your Approval Request for Voucher ${voucherId}`,
        //   POST_MESSAGE: `Your approval request for the voucher with ID ${voucherId} has been sent to ${nextUserId}`,
        //   POST_SUB_TITLE: "Voucher Approval",
        //   POST_FEED: "tasks",
        //   DESTINATION: [{ TYPE: "USER", ID: currentUserid }],
        // });
      } catch (error) {
        // console.error("Error sending approval request:", error);
        throw error;
      }
    }
    if (req.body.assignedTo) {
      sendApprovalRequest(req.body.userId, req.body.assignedTo, voucherId);
    }

    return res.status(200).json({ details: updatedData });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "something went wrong" });
  }
};
module.exports = addTourDetails;
