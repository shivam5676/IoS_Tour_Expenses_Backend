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
  } = req.body;
  let billImage = req.body.billImage;
  if (req.file) {
    billImage = req.file;
  }
  // console.log(billImage)
  // return
  if (!req.body.userId) {
    return res.status(400).json({ msg: "invalid user  ...." });
  }
  if (!voucherId) {
    return res.status(400).json({ msg: "invalid voucher id  ...." });
  }
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

  if (billImage && billImage != "removed") {
    // const matches = billImage.match(/^data:image\/(\w+);base64,/);
    // if (!matches) {
    //   return res.status(400).json({ msg: "Invalid image format" });
    // }
    // const extension = matches[1];
    // const base64Data = billImage.replace(/^data:image\/\w+;base64,/, "");
    const buffer = billImage.buffer;
    const filename = `uploads/${Date.now()}-billImage_${
      billImage.originalname
    }`;

    fs.writeFile(filename, buffer, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ msg: "Failed to save image" });
      }
      try {
        const getExpense = await voucherExpense.findOne({
          where: { id: expenseId },
        });
        const previousImageUrl = getExpense.imagePath;
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
          imagePath: filename,
          adminApprovedAmount:+amount
        });
        if (getExpense.imagePath) {
          // const filename = path.basename(previousImageUrl);
          // Construct the full path to the image file

          if (previousImageUrl) {
            const imagePath = path.join(
              __dirname,
              "..",
              "..",
              previousImageUrl
            );

            // Check if the file exists before attempting to delete it

            if (fs.existsSync(imagePath)) {
              // Delete the file
              fs.unlinkSync(imagePath);
            } else {
              console.log("File does not exist:", imagePath);
            }
          }
        }

        if (!response) {
          return res
            .status(400)
            .json({ msg: "some problem while updating Your expense" });
          //   if (fs.existsSync(imagePath)) {
          //     // Delete the file
          //     fs.unlinkSync(imagePath);
          //   }
        }

        return res.status(200).json({ expenseData: response });
      } catch (err) {
        console.log(err);
        return res
          .status(400)
          .json({ msg: "something went wrong !! try again ...." });
      }
    });
  } else {
    try {
      const getExpense = await voucherExpense.findOne({
        where: { id: expenseId },
      });
      let imagePath = getExpense.imagePath;
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
        imagePath: billImage == "removed" ? "" : imagePath,
        adminApprovedAmount:+amount
      });
      if (billImage === "removed" && imagePath) {
        const oldImagePath = path.join(__dirname, "..", "..", imagePath);
        const newImagePath = path.join(
          __dirname,
          "..",
          "..",
          imagePath + ".delete"
        );

        if (fs.existsSync(oldImagePath)) {
          // Rename the file
          fs.renameSync(oldImagePath, newImagePath);
          console.log("File renamed for deletion:", newImagePath);

          // Attempt to delete the file after renaming
          try {
            fs.unlinkSync(newImagePath);
            console.log("File deleted:", newImagePath);
          } catch (err) {
            console.error("Error deleting file:", err);
            // You can schedule this file for deletion at a later time if needed
          }
        }
      }

      if (!response) {
        return res
          .status(400)
          .json({ msg: "some problem while updating  Your expense" });
      }

      return res.status(200).json({ expenseData: response });
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .json({ msg: "something went wrong !! try again ...." });
    }
  }
};
module.exports = updateExpense;
