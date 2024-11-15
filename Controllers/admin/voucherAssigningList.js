const assignedVoucher = require("../../models/assignedVoucher");
const userTable = require("../../models/userTable");
const Vouchers = require("../../models/VoucherTable");

const voucherAssigningList = async (req, res) => {
    console.log(req)
      if (!req.params.trackingId) {
        return res.status(400).json({ msg: "no tracking id found  ...." });
      }
    try {
        const assignedVoucherList = await assignedVoucher.findAll({
            where: {
                VoucherId: req.params.trackingId ,
            }
        });
        if (assignedVoucherList.length==0) {
            return res.status(400).json({ msg: "no tracking details found" })
        }
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
       
      
      
    } catch (err) {
        console.log(err)
        return res.status(400).json({ msg: "err while finding voucher details " });
    }
};
module.exports = voucherAssigningList;
