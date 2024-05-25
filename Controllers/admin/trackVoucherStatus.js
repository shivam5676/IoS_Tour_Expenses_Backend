const Vouchers = require("../../models/VoucherTable");
const voucherExpense = require("../../models/voucherExpense");
const userTable = require("../../models/userTable");
const VouchersDescription = require("../../models/VoucherDescription");
const fs = require("fs").promises; // Use the promisified version of fs

const trackVoucherStatus = async (req, res) => {
  console.log("object");
  const VoucherId = req.body.voucherId;
  console.log(VoucherId);

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

    // Extracting image paths from the response
    const imagePaths = response.voucherExpenses;
    let images = [];

    // Use Promise.all to wait for all file reads to complete
    await Promise.all(
      imagePaths.map(async (current) => {
        if (current.imagePath) {
          try {
            const data = await fs.readFile(current.imagePath);
            const base64Image = Buffer.from(data).toString("base64");
            const dataUrl = `data:image/png;base64,${base64Image}`;
            images.push(dataUrl);
          } catch (err) {
            console.error("Error reading image file:", err);
            // You might want to handle the error more gracefully here
            // e.g., continue to the next image or return an error response
          }
        }
      })
    );
console.log(images)
    return res.status(200).json({ response, imagePaths: images });
  } catch (err) {
    console.log("----------err", err);
    return res.status(400).json({ msg: "Error while finding the data", err: err });
  }
};

module.exports = trackVoucherStatus;
