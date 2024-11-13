const assignedVoucher = require("../../models/assignedVoucher");
const Vouchers = require("../../models/VoucherTable");

module.exports = async (req, res) => {
    console.log(req.body, req.role)
    const { voucherId, statusTo, statusFrom, userId } = req.body
    console.log(statusFrom)
    if (req.role != "Admin") {
        return res.status(400).json({ msg: "Only Admin Can perform this Action" })
    }
    if (!statusFrom || !statusTo) {
        return res.status(400).json({ msg: "Status type is undefined" })
    }
    if (statusFrom == statusTo) {
        return res.status(400).json({ msg: `You can not change voucher status - ${statusFrom} to ${statusTo}....because both are same ` })
    }

    if (statusFrom != "Accepted" && statusFrom != "Rejected"&&statusFrom != "Closed") {
        return res.status(400).json({ msg: `Pending Voucher Can not be processed to accepted or rejected` })
    }
    if (!userId) {
        return res.status(400).json({ msg: "user is not valid..." })
    }

    try {
        if (statusFrom == "Accepted") {
            const updatedData = await Vouchers.findOne(
                //   { stausType: "Pending" },
                { where: { id: voucherId, statusType: "Accepted" } }
            );
            console.log(updatedData)
            if (!updatedData) {
                return res.status(400).json({ msg: "only accepted voucher can be change" })
            }

            await updatedData.update({
                statusType: statusTo,

                assignedTo: null,
            });
            const assignedVoucherResponse = await assignedVoucher.findOne({ assignedTo: userId, status: "Accepted", voucherId: voucherId, userId: updatedData.userId })
            // console.log(response, "res.....")
            await assignedVoucherResponse.update({ status: statusTo })







        }
        if (statusFrom == "Rejected") {
            const updatedData = await Vouchers.findOne(

                { where: { id: voucherId, statusType: "Rejected" } }
            );
            console.log(updatedData)
            if (!updatedData) {
                return res.status(400).json({ msg: "only Rejected voucher status can be change" })
            }
            await updatedData.update({
                statusType: statusTo,

                assignedTo: null,
            });
            const assignedVoucherResponse = await assignedVoucher.findOne({ assignedTo: userId, status: "Rejected", voucherId: voucherId, userId: updatedData.userId })
            // console.log(response, "res.....")
            await assignedVoucherResponse.update({ status: statusTo })
        }
        if (statusFrom == "Closed") {
            const updatedData = await Vouchers.findOne(
                //   { stausType: "Pending" },
                { where: { id: voucherId, statusType: "Closed" } }
            );
            console.log(updatedData)
            if (!updatedData) {
                return res.status(400).json({ msg: "only accepted voucher can be change" })
            }

            await updatedData.update({
                statusType: statusTo,


            });
            const assignedVoucherResponse = await assignedVoucher.findOne({ assignedTo: userId, status: "Accepted", voucherId: voucherId, userId: updatedData.userId })
            // console.log(response, "res.....")
            await assignedVoucherResponse.update({ status: statusTo })







        }
        return res.status(200).json({ msg: "successfullly status changed" })

    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "error", error })
    }
}