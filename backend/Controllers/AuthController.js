const bcrypt = require('bcrypt');
const UserModel = require('../Models/Userdata');
const jwt = require("jsonwebtoken");

const signup = async(req,res)=>{

    try {
        const{firstname,lastname,phone,email,password,confirmpassword}=req.body;
        const user = await UserModel.findOne({email});
        if(user){
            return res.status(409)
            .json({message:"user already exist,yoou can login", success:false})
        }
        const userModel = new UserModel({firstname,lastname,phone,email,password:await bcrypt.hash(password,10),confirmpassword})
     
        await userModel.save();
        res.status(201)
        .json({
            message:"signup successful",
            success:true
        })
    } catch (error) {
        console.log("Error during signup:", error); 
        res.status(500)
        .json({
            
            message:"Internal server error",
            success:false
            
        })
    }
}
const login= async(req,res)=>{

    try {
        const{email,password}=req.body;
        const user = await UserModel.findOne({email});
        const errorMsg= 'Auth failed email or password is wrong';
        if(!user){
            return res.status(403)
            .json({message:errorMsg, success:false})
        }
      const isPassEqual = await bcrypt.compare(password, user.password);
      if (!isPassEqual) {
        return res.status(403)
        .json({message:errorMsg, success:false})
      }

      const jwtToken =jwt.sign(
        {email:user.email, _id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:"24h"}
    )
       
        res.status(200)
        .json({
            message:"login successful",
            success:true,
            jwtToken,
            email,
            firstname:user.firstname,
            role: user.role 
        })
    } catch (error) {
        res.status(500)
        .json({
            message:"Internal server error",
            success:false
        })
    }
}





module.exports = {
    signup,login
}