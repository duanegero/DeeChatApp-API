//importing jwt used to verify token
const jwt = require("jsonwebtoken");
//geting api key from login
const { apiKey } = require("../routes/login");

//defining function to handle verify token
const verifyToken = (req, res, next) => {
  //variable to handle authorization in header
  const authHeader = req.headers["authorization"];

  //if no header return error status
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header is missing" });
  }
  //varible to handle token after split for auth header
  const token = authHeader.split(" ")[1];

  //if no token return error status json
  if (!token) {
    return res.status(401).json({ message: "Token is missing or wrong." });
  }

  try {
    //use jwt to verify token and go on to next
    jwt.verify(token, apiKey);
    next();
  } catch (error) {
    //catch if any errors log and return error status json
    console.error("Error trying to verify token.", error);
    res.status(401).json({ message: "Error trying to verify token." });
  }
};
//export to use else where
module.exports = verifyToken;
