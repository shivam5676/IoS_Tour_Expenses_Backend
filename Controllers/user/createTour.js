const Vouchers = require("../../models/VoucherTable");
// const assignedVoucher = require("../../models/assignedVoucher");
const axios = require("axios");
require("dotenv").config();

const apiKey = process.env.EXCHANGE_RATE_API_KEY;
const baseUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`;

async function convertCurrency(fromCurrency, toCurrency, amount) {
  try {
    const response = await axios.get(`${baseUrl}${fromCurrency}`);
    const exchangeRates = response.data.conversion_rates;
    const rate = exchangeRates[toCurrency];

    if (!rate) {
      throw new Error(
        `Unable to get currency conversion rate for ${toCurrency}`
      );
    }
    return rate;
    // const convertedAmount = (amount * rate).toFixed(2);
    // console.log(
    //   `${amount} ${fromCurrency} is equal to ${convertedAmount} ${toCurrency}`
    // );
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}
const createTour = async (req, res) => {
  console.log(req.body);
  const getCurrentDate = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = now.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (!req.body.city) {
    return res.status(400).json({ msg: "plz add city ...." });
  }
  if (!req.body.currency) {
    return res.status(400).json({ msg: "plz add currency ...." });
  }
  if (!req.body.userId) {
    return res.status(400).json({ msg: "invalid user  ...." });
  }
  try {
    const rate =await convertCurrency(req.body.currency, "INR");
 
    const voucherCreated = await Vouchers.create({
      statusType: "Created",
      tourLocation: req.body.city,
      userId: req.body.userId,
      currency: req.body.currency,
      tourDate: getCurrentDate(),
      exchangeRates:rate
    });

    if (!voucherCreated) {
      return res
        .status(400)
        .json({ msg: "voucher not created........plz try again later" });
    }
    return res.status(200).json({ voucher: voucherCreated });
  } catch (err) {
    console.log(err);
    return res.status(40).json({ msg: "internal server problem .........." });
  }
};
module.exports = createTour;
