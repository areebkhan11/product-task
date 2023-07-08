require('dotenv').config();
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY; 

function generateToken(payload) {
  console.log("payload",payload)
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}



module.exports = {
  generateToken
};