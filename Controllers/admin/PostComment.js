const Vouchers = require("../../models/VoucherTable");
const userTable = require("../../models/userTable");

const postComment = async (req, res) => {
  if (req.role != "Admin" && req.role != "supervisor") {
    console.log("objectssssssss", req.role);
    return res.status(400).json({ msg: "You are not a authorised user" });
  }
  if (!req.body.userId) {
    return res.status(400).json({ msg: "invalid user  ...." });
  }
  const voucherId = req.body.voucherId;
  //   const userId=req.body.userId
  try {
    const updatedData = await Vouchers.findOne(
      //   { stausType: "Pending" },
      { where: { id: voucherId } }
    );

    await updatedData.update({
      comment: req.body.comment,
      sender: req.body.userId,
    });
    console.log(updatedData);
    const userInfo = await userTable.findOne({
      where: {
        id: req.body.userId,
      },
      attributes: ["firstName", "lastName"],
    });

    
    console.log(userInfo);
    return res.status(200).json({ details: updatedData, sender: userInfo });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "something went wrong" });
  }
};
module.exports = postComment;
