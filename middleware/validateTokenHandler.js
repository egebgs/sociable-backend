const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const validateToken = asyncHandler(async (req, res, next) => {
   let token;
   let authHeader = req.headers.authorization || req.headers.Authorization;
   if(authHeader){
       token = authHeader;
       jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
           if(err){
              res.status(403);
              throw new Error("Invalid token");
           }
           req.user = decoded.user;
           next();
       });
       if(!token){
           res.status(403);
           throw new Error("Not authorized");
       }

   }
   else{
       res.status(403);
       throw new Error("Not authorized");
   }

});

module.exports = validateToken;