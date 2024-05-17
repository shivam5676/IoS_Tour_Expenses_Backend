const Vouchers = require("../../models/VoucherTable");

const createTour = (req, res) => {
  const getCurrentDate = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = now.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (!req.body.city) {
    return res.status(400).json({ msg: "plz add city ...." });
  }
  try {
    const voucherCreated = Vouchers.create({
      statusType: "Created",
      tourLocation: req.body.city,
      userId: req.body.userId,
      tourDate: getCurrentDate(),
    });
    if (!voucherCreated) {
      return res
        .status(400)
        .json({ msg: "voucher not created........plz try again later" });
    }
    return res.status(200).json({ voucher: voucherCreated });
  } catch (err) {
    return res.status(40).json({ msg: "internal server problem .........." });
  }
};
module.exports = createTour;
