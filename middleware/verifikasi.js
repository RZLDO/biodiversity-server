const jwt = require('jsonwebtoken');
const config = require('../config/secret');

function verivication() {
   return function (req,res,next) {
       var role = req.body.role;
       var tokenWithBanner = req.headers.authorization;
       if (tokenWithBanner) {
           var token = tokenWithBanner.split(' ')[1];
           //verfication
           jwt.verify(token,config.secret,async(err,decoded) =>{
               if (err) {
                   return res.status(401).send({auth:false, message:"token tidak terdaftar !"});
               }else{
                   if (role ==2) {
                       req.auth = decoded;
                       next();
                   }else{
                       return res.status(401).send({auth:false,message:"gagal mengotorisasi role anda !"});
                   }
               }
               
           })
       }else{
           return res.status(401).send({auth:false,message:'Token tidak tersedia'});
       }
   }
    
}

module.exports = verivication;