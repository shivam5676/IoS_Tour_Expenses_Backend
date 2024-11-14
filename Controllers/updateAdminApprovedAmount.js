
const voucherExpenses = require("../models/voucherExpense")
async function updateAdminApprovedAmount(req, res) {
  console.log("enter")
  if (req.role != "Admin") {
    return res.status(400).json({ msg: "admin can do this action" })
  }
  return
  try {
    // Fetch all existing records
    const records = await voucherExpenses.findAll();
    console.log(records)
    for (const record of records) {
      // Update each record by setting `adminApprovedAmount` equal to `Amount`
      // await record.update({ adminApprovedAmountRemark: "ok" });
      await record.update({ adminApprovedAmount: record.Amount, adminApprovedAmountRemark: "ok" });
    }

    console.log('All records updated successfully.');
  } catch (error) {
    console.error('Error updating records:', error);
  }
}

module.exports = updateAdminApprovedAmount
