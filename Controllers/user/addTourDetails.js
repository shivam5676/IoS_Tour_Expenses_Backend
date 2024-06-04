const { default: axios } = require("axios");
const VouchersDescription = require("../../models/VoucherDescription");
const Vouchers = require("../../models/VoucherTable");
const assignedVoucher = require("../../models/assignedVoucher");

const addTourDetails = async (req, res) => {
  console.log(req.body);
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
  console.log(typeof +advanceCash);
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
    await updatedData.update({ statusType:  req.body.assignedTo?"Pending":"Accepted" });
    const assigned = assignedVoucher.create({
      status: req.body.assignedTo?"Pending":"Accepted",
      assignedTo: req.body.assignedTo,
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
              "fields[DESCRIPTION]": `Please review and approve the Tour voucher with ID ${voucherId},Reject the Tour Voucher If You find any error in Expenses and thier bills`,
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

        console.log("Approval request sent successfully");
      } catch (error) {
        // console.error("Error sending approval request:", error);
        throw error;
      }
    }
    if (req.body.assignedTo) {
      sendApprovalRequest(req.body.userId, req.body.assignedTo, voucherId);
    }
    console.log(updatedData);
    return res.status(200).json({ details: updatedData });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "something went wrong" });
  }
};
module.exports = addTourDetails;
