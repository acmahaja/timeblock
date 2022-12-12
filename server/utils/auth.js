const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");

async function verifyAccessToken(req, res, next) {
    try {
      const token = req.headers["x-access-token"];

      const decoded = await jwt.verify(token, process.env.SECRET_HASH);
      
      res.locals.decoded = decoded
    
      next();
    } catch (error) {
      res.json({ status: "error", error: "Session error" });
    }
  }

module.exports = {
    verifyAccessToken
}