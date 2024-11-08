const path = require("path");
const voucherExpense = require("../../models/voucherExpense");
const fs = require("fs");

const updateExpenseAdmin = async (req, res, next) => {
    console.log("object")
    const {
        expenseId,
        adminApprovedAmount,
        AdminRemark,
        voucherId,
        userId,
    } = req.body;


    if (!req.body.userId) {
        return res.status(400).json({ msg: "invalid user  ...." });
    }
    if (!voucherId) {
        return res.status(400).json({ msg: "invalid voucher id  ...." });
    }

    if (!adminApprovedAmount) {
        return res.status(400).json({ msg: "adminApprovedAmount can not null" });
    }
    if (isNaN(adminApprovedAmount)) {
        return res.status(400).json({ msg: "adminApprovedAmount can not string" });
    }
    if (!AdminRemark) {
        return res.status(400).json({ msg: "AdminRemark can not null" });
    }

    try {
        const getExpense = await voucherExpense.findOne({
            where: { id: expenseId },
        });
      

        const response = await getExpense.update({
            adminApprovedAmount,
            adminApprovedAmountRemark:AdminRemark,


        });
      

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
};
module.exports = updateExpenseAdmin;
