import userTable from "../models/userTable";

const jwt = require("jsonwebtoken");

const authenticationMiddleware = (req, res, next) => {
  const token = req.headers.token;
  const secretKey = "helloShivam";
  const verifyToken = jwt.verify(
    token,
    secretKey,
    function (err, decodedToken) {
      if (err) {
        return res.status(400).json({ msg: "token is invalid" });
      }
      return decodedToken;
    }
  );
  if (verifyToken) {
    userTable.findOne({
      where: {
        email: decodedToken.email,
        id: decodedToken.id,
      },
    });
  }
};
export default authenticationMiddleware;
