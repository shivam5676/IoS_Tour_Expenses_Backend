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
    billImage,
  } = req.body;

  const uploadDir = path.join(__dirname, "..", "..", "uploads");
  if (!fs.existsSync(uploadDir)) {
    try {
      fs.mkdirSync(uploadDir);
    } catch (err) {
      console.error("Error creating upload directory:", err);
      return res.status(500).json({ msg: "Failed to create upload directory" });
    }
  }
  if (!amount) {
    return res.status(400).json({ msg: "amount can not null" });
  }
  if (isNaN(amount)) {
    return res.status(400).json({ msg: "amount can not string" });
  }
  if (!expenseType) {
    return res.status(400).json({ msg: "expense type can not null" });
  }
  if (!paymentType) {
    return res.status(400).json({ msg: "payment type can not null" });
  }
  if (!date) {
    return res.status(400).json({ msg: "please select date " });
  }
  if (billImage) {
    const matches = billImage.match(/^data:image\/(\w+);base64,/);
    if (!matches) {
      return res.status(400).json({ msg: "Invalid image format" });
    }
    const extension = matches[1];
    const base64Data = billImage.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");
    const filename = `uploads/${Date.now()}-billImage.${extension}`;

    fs.writeFile(filename, buffer, async (err) => {
      if (err) {
        console.error(err);
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
          imagePath: filename,
        });
        if (response) {
          return res.status(200).json({ expenseData: response });
        }
        console.log(response);
        return res
          .status(400)
          .json({ msg: "some problem while saving Your expense" });
      } catch (err) {
        return res
          .status(400)
          .json({ msg: "something went wrong !! try again ...." });
      }
    });
  }else{

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
      imagePath: null,
    });
    if (response) {
      return res.status(200).json({ expenseData: response });
    }
    console.log(response);
    return res
      .status(400)
      .json({ msg: "some problem while saving Your expense" });
  } catch (err) {
    return res
      .status(400)
      .json({ msg: "something went wrong !! try again ...." });
  }
  }
  
};
module.exports = addExpense;
