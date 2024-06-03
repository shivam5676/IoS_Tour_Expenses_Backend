const path = require("path");
const voucherExpense = require("../../models/voucherExpense");
const fs = require("fs");
const { error } = require("console");

const deleteExpense = async (req, res, next) => {
  const { expenseId } = req.body;
console.log(expenseId);
  if (!expenseId) {
    return res.status(400).json({ msg: "expense id  can not null" });
  }
  try {
    // Await the asynchronous destroy call
    const itemDestroyed = await voucherExpense.destroy({
      where: { id: expenseId },
    });

    if (itemDestroyed === 0) {
      // If no rows were affected, send a 404 response
      return res
        .status(404)
        .json({ msg: "No item found with the given expense ID" });
    } else {
      // If rows were affected, send a 200 response
      return res.status(200).json({ msg: "Item deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting item:", error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};
module.exports = deleteExpense;
