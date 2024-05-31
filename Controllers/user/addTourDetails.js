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
    await updatedData.update({ statusType: "Pending" });
    const assigned = assignedVoucher.create({
      status: "Pending",
      assignedTo: req.body.assignedTo,
      VoucherId: voucherId,
      userId: req.body.userId,
    });
    console.log(updatedData);
    return res.status(200).json({ details: updatedData });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "something went wrong" });
  }
};
module.exports = addTourDetails;
