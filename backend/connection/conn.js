const mongoose = require("mongoose");

const conn = async()=>{
    try{
        await mongoose.connect(`${process.env.URI}`);
        console.log("Connected to database")
    }
    catch{
        console.log(error);
    } 
}
conn();