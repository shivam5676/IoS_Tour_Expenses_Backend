const { Op } = require("sequelize");
const assignedVoucher = require("../../models/assignedVoucher");
const Vouchers = require("../../models/VoucherTable");
const userTable = require("../../models/userTable");

const getAllAcceptedVoucher = async (req, res) => {
  console.log(req.role);
  if (
    req.role !== "Admin" &&
    req.role !== "paymentAdmin" &&
    req.role !== "voucherVerifier"
  ) {
    return res.status(400).json({ msg: "You are not an authorised user" });
  }

  if (!req.body.userId) {
    return res.status(400).json({ msg: "Invalid user" });
  }

  const { searchValue } = req.body;

  try {
    const response = await assignedVoucher.findAll({
      where: {
        status: "Accepted",
        assignedTo: req.body.userId,
      },
      include: [
        {
          model: userTable,
          attributes: ["firstName", "lastName"],
          required: false,
        },
        {
          model: Vouchers,
          required: false,
        },
      ],
      // Main search filter for either name or voucher id
      ...(searchValue && {
        where: {
          status: "Accepted",
          assignedTo: req.body.userId,
          [Op.or]: [
            // firstName match
            {
              "$userTable.firstName$": {
                [Op.iLike]: `%${searchValue}%`,
              },
            },
            // Vouchers ID match (assuming searchValue can be a number too)
            {
              "$VoucherTable.id$": {
                [Op.eq]: parseInt(searchValue) || 0,
              },
            },
          ],
        },
      }),
    });

    if (response.length === 0) {
      return res.status(200).json({ userData: [], msg: "No voucher found" });
    }

    return res.status(200).json({ userData: response });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ msg: "Something went wrong", err });
  }
};
module.exports=getAllAcceptedVoucher
