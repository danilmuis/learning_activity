const jwt = require("jsonwebtoken");
const response = require('./response');
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    jwt.verify(token, process.env.TOKEN_SECRET);
    next();
  }catch(err){
    response.responseUnauthorized(res);
  }
};

const generateAccessToken = (data)=> {
  return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
};

module.exports = {
  authenticateToken,
  generateAccessToken
};
