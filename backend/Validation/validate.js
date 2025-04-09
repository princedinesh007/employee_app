
const Joi=require('joi');


const JoiValidate=Joi.object({
    username:Joi.string().min(6).required(),
    password:Joi.string().min(6).required() ,
    email:Joi.string().email()
})

module.exports={JoiValidate}