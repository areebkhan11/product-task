require("dotenv").config();
const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY;

function verifyToken(req, res, next) {
  try {
    let token = req.cookies.access_token;
    if(!token){
        return res.status(401).send({
            status: 401,
            data: null,
            error: "Unauthorized",
          });
    }
    const jwtVerify = jwt.verify(token, secretKey);
    if (jwtVerify) {
      req.user = jwtVerify;
      next();
    } else {
      return res.status(401).send({
        status: 401,
        data: null,
        error: "Unauthorized",
      });
    }
  } catch (error) {
    return res.status(400).send({
      status: 400,
      data: null,
      error: error.message,
    });
  }
}

module.exports = { verifyToken };
