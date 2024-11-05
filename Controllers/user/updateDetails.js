const VouchersDescription = require("../../models/VoucherDescription");
const Vouchers = require("../../models/VoucherTable");

const UpdateDetails = async(req, res) => {

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
    uid,
    descriptionId,
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
    const voucherDetails = await Vouchers.findOne({ where: { id: voucherId } });
    console.log(voucherDetails, "..........");
    const getDescription = await VouchersDescription.findOne({
      where: { id: descriptionId },
      include: [
        {
          model: Vouchers,
          attributes: ["userId"], // Include only the userId field
        },
      ],
    });

    if (!getDescription) {
      return res
        .status(400)
        .json({ msg: "no voucher description found for this description id" });
    }
    if (getDescription?.Voucher?.userId != userId) {
      return res.status(400).json({
        msg: "only the creator of this voucher can edit it......you are not authorize for doing this action",
      });
    }

    const savedDetails = await getDescription.update({
      purpose: purpose,
      arrivalDate: arrivalDate,
      departureDate: departureDate,
      transportArrival: transportArrival,
      transportDeparture: transportDeparture,
      arrivalTime: arrivalTime,
      departureTime: departureTime,
      advanceCash: advanceCash,
      dailyAllowance: dailyAllowance,
    });
    if (!savedDetails) {
      return res
        .status(400)
        .json({ msg: "description could not saved...check all fields " });
    }

    return res.status(200).json(savedDetails);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "something went wrong" });
  }
};
module.exports = UpdateDetails;
