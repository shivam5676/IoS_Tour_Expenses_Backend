const assignedVoucher = require("../../models/assignedVoucher");
const userTable = require("../../models/userTable");
const Vouchers = require("../../models/VoucherTable");

const voucherAssigningList = async (req, res) => {
    //   if (!req.body.userId) {
    //     return res.status(400).json({ msg: "invalid user  ...." });
    //   }
    try {
        const assignedVoucherList = await assignedVoucher.findAll({
            where: {
                VoucherId: req.body.voucherNo || 44,
            }
        });
        const assignedVoucherListPromises = assignedVoucherList.map(async (current) => {
            // Fetch user details
            const AssignedUserDetails = await userTable.findOne({
                where: { id: current.assignedTo },
                attributes: ["firstName", "lastName"]
            });

            // Return an object containing both user details and voucher status
            return {



                handler: `${AssignedUserDetails?.firstName || ""} ${AssignedUserDetails?.lastName || ""} `,


                status: current.status

            };
        });

        // Wait for all promises to resolve
        const result = await Promise.all(assignedVoucherListPromises);
        return res.status(200).json({ trackingDetails: result });
        console.log(result); // Logs the array of user and voucher status objects
        return
        if (!voucherDetail) {
            return res.status(400).json({ msg: "voucher no is invalid" });
        }
        return res.status(200).json({ data: voucherDetail });
    } catch (err) {
        console.log(err)
        return res.status(400).json({ msg: "err while finding voucher details " });
    }
};
module.exports = voucherAssigningList;
