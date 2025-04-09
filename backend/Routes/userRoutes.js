const express=require("express");
const userMethod=require('../controller/userController')

const Router=express.Router();

Router.post('/register',userMethod.register);
Router.post('/login',userMethod.login);


module.exports=Router;
