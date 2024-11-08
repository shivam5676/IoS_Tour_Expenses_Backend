const path = require("path");
const voucherExpense = require("../../models/voucherExpense");
const fs = require("fs");

const addExpense = async (req, res, next) => {
  const {
    amount,
    expenseType,
    description,
    voucher,
    paymentType,
    date,
    voucherId,
    userId,
  } = req.body;
  const billImage = req.file;
  console.log(billImage);
  // return;
  const uploadDir = path.join(__dirname, "..", "..", "uploads");

  if (!fs.existsSync(uploadDir)) {
    try {
      fs.mkdirSync(uploadDir, { recursive: true }); // Ensure the directory is created with recursive flag
    } catch (err) {
      console.error("Error creating upload directory:", err);
      return res.status(500).json({ msg: "Failed to create upload directory" });
    }
  }

  if (!amount) {
    return res.status(400).json({ msg: "amount cannot be null" });
  }
  if (isNaN(amount)) {
    return res.status(400).json({ msg: "amount must be a number" });
  }
  if (!expenseType) {
    return res.status(400).json({ msg: "expense type cannot be null" });
  }
  if (!paymentType) {
    return res.status(400).json({ msg: "payment type cannot be null" });
  }
  if (!date) {
    return res.status(400).json({ msg: "please select date" });
  }

  if (billImage) {

    const buffer = billImage.buffer;

    const appendedName = `${Date.now()}-billImage_${billImage.originalname}`;
    const filename = path.join(uploadDir, appendedName);

    fs.writeFile(filename, buffer, async (err) => {
      if (err) {
        console.error("Error saving image:", err);
        return res.status(500).json({ msg: "Failed to save image" });
      }
      try {
        const response = await voucherExpense.create({
          Amount: +amount,
          expenseType,
          voucherNo: voucher,
          paymentType,
          date,
          description,
          VoucherId: voucherId,
          userId,
          imagePath: `uploads/${appendedName}`,
          adminApprovedAmount: +amount
        });
        return res.status(200).json({ expenseData: response });
      } catch (err) {
        console.error("Error saving expense:", err);
        return res.status(400).json({ msg: "Something went wrong, try again" });
      }
    });
  } else {
    try {
      const response = await voucherExpense.create({
        Amount: +amount,
        expenseType,
        voucherNo: voucher,
        paymentType,
        date,
        description,
        VoucherId: voucherId,
        userId,
        imagePath: null,adminApprovedAmount: +amount
      });
      return res.status(200).json({ expenseData: response });
    } catch (err) {
      console.error("Error saving expense:", err);
      return res.status(400).json({ msg: "Something went wrong, try again" });
    }
  }
};

module.exports = addExpense;
