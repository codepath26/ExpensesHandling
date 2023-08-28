require('dotenv').config(); 
const jwt = require("jsonwebtoken");

exports.authenticateUser = (req,res ,next)=>{
  const token = req.header("Authorization");
  const user = jwt.verify(token,process.env.JSONWEB_SECRET_KEY);
  req.user = user ;
  next();
}