const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:["true","UserName is mandatory"],
        unique: true,
    },
    password:{
        type:String,
        required:['true',"Password is mandatory"]
    },
    email:{
        type:String,  
    }
});
const user=mongoose.model("userSchema",userSchema);
module.exports=user;