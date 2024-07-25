require("dotenv").config();
const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");

const rrAlgoSchema=mongoose.Schema({
    filename:{
        type:String,
        required:true
    },
    QuantumTime:{
        type:Number,
        required:true
    },
    AvgCompletionTime:{
        type:Number,
        required:true
    },
    AvgTAT:{
        type:Number,
        required:true
    },
    AvgResponseTime:{
        type:Number,
        required:true
    },
    AvgWaitingTime:{
        type:Number,
        required:true
    },
    Throughput:{
        type:Number,
        required:true
    },
    date: {
        type: Date,
        //Setting the default value
        default: Date.now,
      }
});

//CREATING THE RR ALGO COLLECTION MONGODB
const RoundRobin =mongoose.model("RoundRobin",rrAlgoSchema);

module.exports=RoundRobin;