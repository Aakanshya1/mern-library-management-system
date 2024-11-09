const mongoose = require('mongoose');

const BorrowSchema = new mongoose.Schema({
    bookId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Book',
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    fromDate:{
        type:Date,
        required:true,
    },
    toDate:{
        type:Date,
        required:true,
    },
    returned:{
        type:Boolean,
        default:false,
    },
    fine:{
        type:Number,
        default:0,
    }

},{timestamps:true})

const BookBorrow= mongoose.model('Borrow',BorrowSchema);
module.exports= BookBorrow;