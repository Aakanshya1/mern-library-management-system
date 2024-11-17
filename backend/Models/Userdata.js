const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    avatar: {
        type: String,
       
    },
    role: { type: String, 
        enum: ['user', 'admin', 'librarian'], default: 'user'
    },
    borrowedpoints:{
        type:Number,
        default:0,
    },
    contributionpoints:{
        type:Number,
        default:0,
    },
    totalPoints: {
        type: Number,
     default: 0 
    }
    
},
);
const UserModel = mongoose.model("User",UserSchema);
module.exports = UserModel;