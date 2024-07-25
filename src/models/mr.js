require("dotenv").config();
const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");

const mrSchema = mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    No_of_Frames: {
        type: Number,
        required: true
    },
    Total_Hits: {
        type: Number,
        required: true
    },
    Total_Miss: {
        type: Number,
        required: true
    },
    Hit_Ratio: {
        type: Number,
        required: true
    },
    Miss_Ratio: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        //Setting the default value
        default: Date.now,
    }

})

const MruAlgorithm = mongoose.model("MruAlgorithm", mrSchema);

module.exports = MruAlgorithm;