const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("sequelize");

const db = require("./util/database");
const adminRoutes = require("./Routes/admin");
const userTable = require("./models/userTable");
const authRoutes = require("./Routes/auth");
const VouchersDescription = require("./models/VoucherDescription");
const voucherExpense = require("./models/voucherExpense");
const Vouchers = require("./models/VoucherTable");
const userRoutes = require("./Routes/user");
const path = require("path");
const assignedVoucher = require("./models/assignedVoucher");
// const { machine } = require("os")
const Flavor = require("./models/flavour");
const MachineWiseFlavor = require("./models/machineWiseFlavor");
const machine = require("./models/machine");
const Machines = require("./models/machine");
const BITRIX24_INSTANCE = "https://b24-ye5msp.bitrix24.in"; // Replace with your Bitrix24 instance URL
const LOCALHOST_INSTANCE = "http://localhost:2000";
// const path = require('path');

// Adjust X-Frame-Options to allow framing from Bitrix24 and localhost
app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", `ALLOW-FROM ${BITRIX24_INSTANCE}`);
  next();
});

// Adjust Content-Security-Policy to allow framing from Bitrix24 and localhost
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    `frame-ancestors 'self' ${BITRIX24_INSTANCE} ${LOCALHOST_INSTANCE};`
  );
  next();
});
app.use(cors({ credentials: true }));
const builtPath = path.join(__dirname, "build");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/popup", (req, res) => {
  console.log(path.join(__dirname, "popup.html"));
  res.sendFile(path.join(__dirname, "popup.html"));
});
// Vouchers.hasOne(userTable)
// userTable.belongToMany(Vouchers)
userTable.hasMany(Vouchers, { onDelete: "CASCADE" });
Vouchers.belongsTo(userTable, { onDelete: "CASCADE" });

Vouchers.hasOne(VouchersDescription);
VouchersDescription.belongsTo(Vouchers);

Vouchers.hasMany(voucherExpense);
voucherExpense.belongsTo(Vouchers);

userTable.hasMany(voucherExpense);
voucherExpense.belongsTo(userTable);

Vouchers.hasMany(assignedVoucher);
assignedVoucher.belongsTo(Vouchers);

userTable.hasMany(assignedVoucher);
assignedVoucher.belongsTo(userTable);


Machines.belongsToMany(Flavor, { through: MachineWiseFlavor, foreignKey: 'machineId' });
Flavor.belongsToMany(Machines,{ through: MachineWiseFlavor, foreignKey: 'recipie' })


app.use(express.static(builtPath));

app.post("/", (req, res) => {
  //for bitrix redirecting
  console.log(path.join(__dirname, "build/index.html"));
  res.sendFile(path.join(__dirname, "build/index.html"));
});
app.get("/", (req, res) => {

  //for bitrix redirecting
  console.log(path.join(__dirname, "build/index.html"));
  res.sendFile(path.join(__dirname, "build/index.html"));
});
app.use(bodyParser.json({ extended: false, limit: "500mb" }));
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use(authRoutes);

db.sync({ force: true })
  .then(async () => {
    app.listen(2000, () => {});
  })
  .catch((err) => console.log(err));
