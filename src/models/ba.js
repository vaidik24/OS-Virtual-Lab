require("dotenv").config();
const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");

const bkSchema=mongoose.Schema({
    filename:{
        type:String,
        required:true
    },
    Total_A_Res:{
        type:Number,
        required:true
    },
    Total_B_Res:{
        type:Number,
        required:true
    },
    Total_C_Res:{
        type:Number,
        required:true
    },
    Res_Alloc:{
        type:String,
        required:true
    },
    Deadlock_State:{
        type:String,
        required:true
    },
    Safe_Sequence:{
        type:String,
        required:true
    },
    date: {
        type: Date,
        //Setting the default value
        default: Date.now,
      } 
})

const BankerAlgorithm = mongoose.model("BankerAlgorithm",bkSchema);

module.exports=BankerAlgorithm;