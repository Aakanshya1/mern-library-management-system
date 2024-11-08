
const Joi = require ('joi');

 const signupvalidation =(req,res,next)=>{
    const schema = Joi.object({
        firstname:Joi.string().min(3).max(100).required(),
        lastname:Joi.string().min(3).max(100).required(),
        phone:Joi.string().min(10).max(10).required(), 
        email:Joi.string().email().required(), 
        password:Joi.string().min(6).max(10).required(),
        confirmpassword: Joi.string().valid(Joi.ref('password')).required().messages({
            'any.only': 'Passwords do not match'
        })
    })
    const{error} = schema.validate(req.body);
    if (error) {
        return res.status(400)
        .json({ message: "Validation error",
            details: error.details.map(detail => detail.message)})
    } next();
 }

 const loginpvalidation =(req,res,next)=>{
    const schema = Joi.object({
        email:Joi.string().email().required(), 
        password:Joi.string().min(6).max(10).required(),
    })
    const{error} = schema.validate(req.body);
    if (error) {
        return res.status(400)
        .json({ message: "Validation error",
            details: error.details.map(detail => detail.message)})
    } next();
 }
 module.exports={
    signupvalidation,
    loginpvalidation
 }