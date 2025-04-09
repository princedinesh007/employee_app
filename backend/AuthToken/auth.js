const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;


const authenticate=({user})=>{
    const username=user;
    const payload = { username};
    const token = JWT.sign(payload, SECRET_KEY, { expiresIn: "10m" });
    return token;

}

module.exports={authenticate}