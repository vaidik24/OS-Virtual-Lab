require("dotenv").config();
const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");

const formSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    minlength: 10,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is Invalid");
      }
    },
  },
  age: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

//GENERATING JWT USING MIDDLEWARE FOR COOKIES PURPOSE
formSchema.methods.generateAuthToken = async function () {
  try {
    // console.log(process.env.SECRET_KEY);
    const tokenVal = jwt.sign(
      { _id: this._id.toString() },
      process.env.SECRET_KEY
    );
    // console.log(tokenVal);

    //ADDING THE TOKEN FOR THE PARTICULAR ID IN OUR TOKENS ARRAY
    this.tokens = this.tokens.concat({ token: tokenVal });
    // console.log(this);

    //SAVING THE TOKEN TO DB AS AN OBJECT
    // const save = await this.save();
    // console.log("hi");
    return tokenVal;
  } catch (e) {
    res.send("Error is :" + e);
    console.log("Error is :" + e);
  }
};

//HASHING THE PASSWORD USING MIDDLEWARE "PRE"

//TO MAKE A PASSWORD HASHED BEFORE SAVING TO DB WE HAVE USE "PRE" MW
formSchema.pre("save", async function (next) {
  //THIS IS USED TO RUN THIS PORTION OF CODE ONLY WHEN SOMEONE UPDATE PASSWORD FIELD ONLY
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 8);
    // console.log(`the current password is ${this.password}`);

    //HANDLING THE CONFIRM PASSWORD WHICH CAN LEAK THE DETAILS
    this.confirmPassword = await bcryptjs.hash(this.password, 8);
  }
  next();
});

//CREATING A COLLECTION
const LoginForm = new mongoose.model("LoginForm", formSchema);

//EXPORTING THIS PAGE TO APP.JS
module.exports = LoginForm;
