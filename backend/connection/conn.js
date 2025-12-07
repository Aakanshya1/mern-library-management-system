import { connect } from "mongoose";

const conn = async()=>{
    try{
        await connect(`${process.env.URI}`);
        console.log("Connected to database")
    }
    catch(err){
        console.log(err);
    } 
}
conn();