import mongoose from "mongoose";

const dataSchema = mongoose.Schema({
    price : {
        type : "Number",
        required : true,
    },
    team : {
        type : "String",
        enum : ["1st", "2nd", "3rd"],
        default : "1st"
    }
    
})