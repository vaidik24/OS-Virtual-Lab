require("dotenv").config();
const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");

const scanSchema = mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    Method_Name: {
        type: String,
        required: true
    },
    Track: {
        type: String,
        required: true
    }
    ,
    Total_Tracks: {
        type: Number,
        required: true
    },
    Starting_Track: {
        type: Number,
        required: true
    },
    Time_Taken_Per_Track: {
        type: Number,
        required: true
    },
    Total_Tracks_Travelled: {
        type: Number,
        // required:true
    },
    Total_Time_Taken: {
        type: Number,
        // required:true
    },
    date: {
        type: Date,
        //Setting the default value
        default: Date.now,
    }
})


const ScanAlgorithm = mongoose.model("ScanAlgorithm", scanSchema);

module.exports = ScanAlgorithm;