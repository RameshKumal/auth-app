const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  try {
    let token = req.cookies["accessToken"];

    if (!token) {
      return res.status(403).send("Access denied.");
    }

    // token = token.slice(7, token.length).trimLeft();
    // token = token.split(" ")[1];
    // console.log(token);
    jwt.verify(token, process.env.JWT_SECRET, (err, valid) => {
      if (err) {
        res.status(401).json({ result: "please provide the valid token" });
      } else {
        console.log("here");
        next();
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = { verifyToken };
