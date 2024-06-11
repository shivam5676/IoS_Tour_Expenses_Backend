const path = require("path");
const voucherExpense = require("../../models/voucherExpense");
const fs = require("fs");

const updateExpense = async (req, res, next) => {
  const {
    expenseId,
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
  console.log(
    billImage == undefined,
    !billImage,
    billImage.length == 0,
    "........"
  );
  if (billImage) {
    console.log(billImage);
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
        const getExpense = await voucherExpense.findOne({
          where: { id: expenseId },
        });
        const previousImageUrl=getExpense.imagePath
        if (!getExpense) {
          return res
            .status(400)
            .json({ msg: "invalid id... please refresh the page" });
        }
        console.log(filename, "...<<<");
        const response = await getExpense.update({
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
                if (getExpense.imagePath) {
                  const filename = path.basename(previousImageUrl);
                  // Construct the full path to the image file
                  const imagePath = path.join(
                    __dirname,
                    "..",
                    "..",
                    previousImageUrlgetExpense.imagePath
                  );
        console.log(imagePath)
                  // Check if the file exists before attempting to delete it
                  if (fs.existsSync(imagePath)) {
                    // Delete the file
                    fs.unlinkSync(imagePath);
                  } else {
                    console.log("File does not exist:", imagePath);
                  }
                }

        if (response) {
          //   if (fs.existsSync(imagePath)) {
          //     // Delete the file
          //     fs.unlinkSync(imagePath);
          //   }
          return res.status(200).json({ expenseData: response });
        }
        console.log(response);
        return res
          .status(400)
          .json({ msg: "some problem while updating Your expense" });
      } catch (err) {
        return res
          .status(400)
          .json({ msg: "something went wrong !! try again ...." });
      }
    });
  } else {
    try {
      console.log(expenseId);
      const getExpense = await voucherExpense.findOne({
        where: { id: expenseId },
      });
      if (!getExpense) {
        return res
          .status(400)
          .json({ msg: "invalid id... please refresh the page" });
      }

      const response = await getExpense.update({
        Amount: +amount,
        expenseType,
        voucherNo: voucher,
        paymentType,
        date,
        description,
        VoucherId: voucherId,
        userId,
        imagePath: getExpense.imagePath,
      });
      if (response) {
        return res.status(200).json({ expenseData: response });
      }
      console.log(response);
      return res
        .status(400)
        .json({ msg: "some problem while updating  Your expense" });
    } catch (err) {
      return res
        .status(400)
        .json({ msg: "something went wrong !! try again ...." });
    }
  }
};
module.exports = updateExpense;
