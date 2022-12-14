const jwt = require("jsonwebtoken");
const { CHAR } = require("sequelize");
const dotenv = require('dotenv');

dotenv.config();

const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token,process.env.JWT_KEY);
    req.userData = decodedToken;
    next();
  } catch (e) {
    res.status(401).json({
      message: "Invalid or expired token",
      error: e,
    });
  }
};

module.exports = {
  checkAuth: checkAuth,
};
