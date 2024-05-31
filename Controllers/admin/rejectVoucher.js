const Vouchers = require("../../models/VoucherTable");
const assignedVoucher = require("../../models/assignedVoucher");

const rejectVoucher = async (req, res) => {
  const voucherId = req.body.voucherId;
  //   const userId = req.body.userId;
  try {
    const getAssignedVoucher = await assignedVoucher.findOne({
      where: {
        assignedTo: req.body.userId,
        status: "Pending",
        VoucherId: voucherId,
      },
    });
    const updateAssignedVoucher = await getAssignedVoucher.update({
      status: "Rejected",
    });

    if (updateAssignedVoucher) {
      const updatedData = await Vouchers.findOne(
        //   { stausType: "Pending" },
        { where: { id: voucherId } }
      );
      if (!req.body.assignedTo) {
        await updatedData.update({
          statusType: "Accepted",
          comment: req.body.comment,
          sender: req.body.userId,
          assignedTo: req.body.assignedTo,
        });
      } else {
        await assignedVoucher.create({
          assignedTo: updateAssignedVoucher.userId,
          status: "Rejected",
          VoucherId: voucherId,
          userId: updateAssignedVoucher.userId,
        });
        await updatedData.update({
          statusType: "Rejected",
          comment: req.body.comment,
          sender: req.body.userId,
          assignedTo: req.body.assignedTo,
        });
      }

      console.log(updatedData);
      return res.status(200).json({ details: updatedData });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "something went wrong" });
  }
};
module.exports = rejectVoucher;
