const Vouchers = require("../../models/VoucherTable");
const assignedVoucher = require("../../models/assignedVoucher");

const rejectVoucher = async (req, res) => {
  if (req.role != "Admin" && req.role != "supervisor") {
    return res.status(400).json({ msg: "You are not a authorised user" });
  }
  const voucherId = req.body.voucherId;
  if (!req.body.userId) {
    return res.status(400).json({ msg: "invalid user  ...." });
  }
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
          statusType: "Rejected",
          comment: req.body.comment,
          sender: req.body.userId,
          assignedTo: null,
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
          assignedTo: null,
        });
      }

      
      return res.status(200).json({ details: updatedData });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "something went wrong" });
  }
};
module.exports = rejectVoucher;
