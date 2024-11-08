const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    isbn:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    bookimage:{
        type:String,
    },
    bookCount:{
        type:Number,
        
    },
    bookStatus:{
        type:String,
        enum:['Available','Borrowed'],
        default:"Available"
    }

})
const BookModel = mongoose.model("Book", BookSchema);
module.exports = BookModel;