const path = require("path");
const voucherExpense = require("../../models/voucherExpense");
const fs = require("fs");
const { error } = require("console");

const deleteExpense = async (req, res, next) => {
  const { expenseId } = req.body;
  if (!voucherId) {
    return res.status(400).json({ msg: "voucherId is invalid" });
  }
  if (!expenseId) {
    return res.status(400).json({ msg: "expense id  can not null" });
  }
  try {
    // Find the expense record by id
    const expense = await voucherExpense.findOne({ where: { id: expenseId } });

    if (!expense) {
      return res
        .status(404)
        .json({ msg: "No item found with the given expense ID" });
    }

    // Extract the filename from the imagePath
    console.log(expense.imagePath);
    if (expense.imagePath) {
      const filename = path.basename(expense.imagePath);
      // Construct the full path to the image file
      const imagePath = path.join(__dirname, "..", "..", expense.imagePath);

      // Check if the file exists before attempting to delete it
      if (fs.existsSync(imagePath)) {
        // Delete the file
        fs.unlinkSync(imagePath);
      } else {
        console.log("File does not exist:", imagePath);
      }
    }

    // Delete the expense record from the database
    await expense.destroy();

    return res.status(200).json({ msg: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};
module.exports = deleteExpense;
