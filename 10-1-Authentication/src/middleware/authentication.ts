import jwt from "jsonwebtoken";
const config = require("config");

const authentication = (req: any, res: any, next: any) => {
  console.log("Authenticating ...");

  const token = req.headers("x-auth-token");
  if (!token) return res.status(401).send("Access denied, no token provided");

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};

module.exports = authentication;
