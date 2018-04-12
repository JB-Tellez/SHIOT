'use strict'; 
require('dotenv').config();
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const User = require('../model/user.js');


module.exports = function(req, res, next){
 
  var authHeader = req.get('Authorization');
  
  if(!authHeader){
    return next(createError(401, 'authorization header required'));

  };

  var token = authHeader.split('Bearer ')[1];
  if(!token){
    return next(createError(401, 'token required'));
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if(err) return next(err);
   
    console.log('24-bearer-auth',decoded);
    
    User.findOne({ token: decoded.findToken})
    .then(user =>{
      req.user = user;
     
      next();
    })
  .catch( err =>{
    return next(createError(401, err.message));
  });
  });  
};