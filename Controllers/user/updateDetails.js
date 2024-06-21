const VouchersDescription = require("../../models/VoucherDescription");

const UpdateDetails = async (req, res) => {
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
    descriptionId,
  } = req.body;
  console.log(
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
    descriptionId
  );
  //   return;
  try {
    const getDescription = await VouchersDescription.findOne({
      where: { id: descriptionId },
    });
    console.log(getDescription);
    // return;
    if (!getDescription) {
      return res
        .status(400)
        .json({ msg: "no voucher description found for this description id" });
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
      dailyAllowance: advanceCash,
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
