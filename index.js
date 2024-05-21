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
const builtPath = path.join(__dirname, "../IoS_Tour_Expenses/build");

app.use(cors());
// Vouchers.hasOne(userTable)
// userTable.belongToMany(Vouchers)
userTable.hasMany(Vouchers)
Vouchers.belongsTo(userTable)

Vouchers.hasOne(VouchersDescription);
VouchersDescription.belongsTo(Vouchers);

Vouchers.hasMany(voucherExpense);
voucherExpense.belongsTo(Vouchers);

userTable.hasMany(voucherExpense)
voucherExpense.belongsTo(userTable)

app.use(express.static(builtPath));
app.use(bodyParser.json({ extended: false }));
app.use("/admin", adminRoutes);
app.use("/user", userRoutes)
app.use(authRoutes);
db.sync({ force: !true })
  .then(async () => {
    console.log("second print");
    const userFind = await userTable.findOne({
      where: { email: "shivam@gmail.com" },
    });

    if (!userFind) {
      userTable.create({
        firstName: "shivam",
        lastName: "singh",
        email: "shivam@gmail.com",
        mobile: "1234567890",
        isAdmin: true,
        password: "12345",
      });
    }

        
        app.listen(2000, () => { });
  })
  .catch((err) => console.log(err));
