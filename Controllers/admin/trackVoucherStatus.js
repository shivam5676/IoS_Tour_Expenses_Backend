const Vouchers = require("../../models/VoucherTable");
const voucherExpense = require("../../models/voucherExpense");
const userTable = require("../../models/userTable");
const VouchersDescription = require("../../models/VoucherDescription");
const fs = require("fs");
const trackVoucherStatus = async (req, res) => {
  console.log("object");
  const VoucherId = req.body.voucherId;
  console.log(VoucherId);
  //   if (!VoucherId) {
  //     return;
  //   }
  try {
    const response = await Vouchers.findOne({
      where: { id: VoucherId },
      include: [
        { model: userTable, attributes: ["firstName", "lastName"] },
        { model: VouchersDescription },
        { model: voucherExpense },
      ],
    });

    if (!response) {
      return res.status(400).json({ msg: "no data found for that voucher" });
    }
    // Extracting image path from the response
    const imagePaths = response.voucherExpenses;
    // console.log(imagePaths);
    imagePaths.forEach((current) => {
      console.log(current.imagePath,"...........");
    });
return;
    // Read the image file as binary data
    if (imagePaths) {
      fs.readFile(imagePaths, (err, data) => {
        if (err) {
          console.error("Error reading image file:", err);
          return res.status(500).json({ msg: "Error reading image file" });
        }

        // Encode the image data as base64
        const base64Image = Buffer.from(data).toString("base64");

        // Create a data URL
        const dataUrl = `data:image/png;base64,${base64Image}`;
        // console.log(dataUrl);
        // console.log("object")
        // Send the response with the data URL
        return res.status(200).json({ response, imagePaths: dataUrl });
      });
    } else {
      //  console.log(file);
      return res.status(200).json({ response, imagePaths: null });
    }
  } catch (err) {
    console.log("----------err", err);
    return res.status(400).json({ msg: "err whle finding the data", err: err });
  }
};
module.exports = trackVoucherStatus;
