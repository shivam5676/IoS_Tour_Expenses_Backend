const Vouchers = require("../../models/VoucherTable");
const userTable = require("../../models/userTable");

const getClosedVoucher = async (req, res, next) => {
    if (!req.body.userId) {
        return res.status(400).json({ msg: "invalid user  ...." });
    }
    try {
        const voucherList = await Vouchers.findAll({
            where: {
                statusType: "Closed",
                assignedTo: req.body.userId,
            },
            include: [{ model: userTable, attributes: ["firstName", "lastName"] }],
        });
        if (!req.body.userId) {
            return res.status(400).json({ msg: "invalid user  ...." });
        }
        if (voucherList.length == 0) {
            return res
                .status(200)
                .json({ vouchers: [], msg: "No Voucher is Closed" });
        }
        return res.status(200).json({ vouchers: voucherList });
    } catch (err) {
        return res.status(400).json({ msg: "something went wrong " });
    }
};

module.exports = getClosedVoucher;
