const mongoose = require("mongoose");

const ContributionSchema = new mongoose.Schema({
    bookname:{
        type:String,
        required:true,
    },
    authorname:{
        type:String,
        required:true,
    },
    reason:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
})

const ContributionModel = mongoose.model("Contribution",ContributionSchema);
module.exports= ContributionModel;