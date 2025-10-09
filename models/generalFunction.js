const bcrypt = require("bcrypt");

// encry or hash password
function hashPassword(pass, saltRounds=12) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(pass, saltRounds, (error, hash) => {
      if (error) reject(error);
      else resolve(hash);
    });
  });
}

// decrypt or compare password
function bcryptPassword(hashPass, password){
  return new Promise((resolve, reject)=>{
    bcrypt.compare(hashPass, password, (error, pass)=>{
      if(error){
        reject(error);
      }else{
        resolve(pass);
      }
    })
  })
  
}

module.exports = {hashPassword, bcryptPassword}