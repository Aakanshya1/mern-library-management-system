const mongoose = require("mongoose");
 const TransactionSchema =  new mongoose.Schema({
    borrowId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Borrow'
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    bookId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Book'  
    },
    price:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Borrow'
    },
    finePaid:{
        type:Number,

    },paymentDate: { type: Date, default: Date.now },
 })
 const Transaction = mongoose.model('Transaction', TransactionSchema);
 module.exports = Transaction;