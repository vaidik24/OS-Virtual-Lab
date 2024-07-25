require("dotenv").config();
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const port = process.env.PORT || 3000;
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth");

require("./db/conn");

//SETTING THE PUBLIC FOLDER PATH
const staticPath = path.join(__dirname, "../public");

//SETTING THE VIEWS FOLDER PATH
const viewPath = path.join(__dirname, "../templates/views");

const partialPath = path.join(__dirname, "../templates/partials");

//GETTING THE ROUTER
const mainRouter = require("./routers/routes");

//TO ENABLE THE USE OF COOKIE-PARSER MIDDLEWARE
app.use(cookieParser());

//GETTING THE COLLECTION FROM MODEL FOLDER
const LoginForm = require("./models/reg.js");

//REGISTERING PARTIALS
hbs.registerPartials(partialPath);

app.use(express.json());

//TO GET ALL THE DATA FILLED BY USER IN A FORM
app.use(express.urlencoded({ extended: false }));

//ADDING THE PUBLIC FOLDER PATH
app.use(express.static(staticPath));

//SETTING THE VIEW ENGINE
app.set("view engine", "hbs");

//ADDING THE VIEWS FOLDER PATH
app.set("views", viewPath);

//HANDLING THE POST REQUEST ON REGISTER FORM
app.post("/register", async (req, res) => {
  try {
    const password = req.body.pass;
    const cpassword = req.body.cpass;

    if (password === cpassword) {
      //ADDING DATA TO DB
      const regData = new LoginForm({
        firstname: req.body.fname,
        lastname: req.body.lname,
        gender: req.body.gender,
        phone: req.body.Pnumber,
        email: req.body.emailID,
        age: req.body.age,
        password: req.body.pass,
        confirmPassword: req.body.cpass,
      });
      //   console.log(regData);

      //GENERATING JWT USING MIDDLEWARE WHILE REGISTERING
      const token = await regData.generateAuthToken();

      //GENERATING COOKIES FOR THE TOKEN GENERATED ABOVE TO SAVE INFO OF THE LOGGED IN USER

      /*
            res.cookie() = function is used to set the cookie name to value.
            the value parameter may be a string or object converted to JSON.
            */

      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 1000000),
        httpOnly: true, //THIS IS DONE TO DON'T PERMIT CLIENT SIDE SCRIPTING LANGUAGE TO REMOVE COOKIE CREATED
        // secure:true    //ENABLES COOKIE TO WORK ONLY ON "HTTPS"
      });

      //GETTING COOKIE VALUES USING COOKIE-PARSER
      // console.log(req.cookies.jwt);

      //SAVING DATA TO DB
      console.log(regData);
      const realData = await regData.save();

      //RENDERING TO MAIN PAGE
      res.render("index");
    } else {
      res.send("PASSWORDS ARE NOT MATCHING");
    }
  } catch (e) {
    res.status(404).send(e);
    console.log("Error in the Register page..." + e);
  }
});

//HANDLING LOGIN REQUEST ON LOGIN FORM USING POST REQUEST
app.post("/login", async (req, res) => {
  try {
    //GETTING EMAIL AND PASSWORD
    const email = req.body.email;
    const password = req.body.pass;

    //CHECKING EMAIL FROM DB
    const userEmail = await LoginForm.findOne({ email: email });

    //CHECKING THE HASH VALUE OF PASSWORD
    const isMatch = await bcryptjs.compare(password, userEmail.password);

    //GENERATING THE TOKEN WHILE LOGIN
    const token = await userEmail.generateAuthToken();
    // console.log(token);

    //GENERATING COOKIE AND PASSING TOKEN TO IT
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 1000000),
      httpOnly: true, //THIS IS DONE TO DON'T PERMIT CLIENT SIDE SCRIPTING LANGUAGE TO REMOVE COOKIE CREATED
      // secure:true    //ENABLES COOKIE TO WORK ONLY ON "HTTPS"
    });

    // console.log();
    //GETTING THE COOKIG VALUE USING COOKIE-PARSER
    // console.log(`This is the required cookie ${req.cookies.jwt}`);

    // CHECKING AND MATCHING PASSWORD FROM DB
    if (isMatch) {
      res.status(201).render("index");
    } else {
      res.status(400).send("Invalid Login Details Please Try again !!");
    }
  } catch (e) {
    res.status(404).send("Invalid Login Details Please Try again !!" + e);
  }
});

// HANDLING REMOVAL OF COOKIES AND LOGOUT FUNCTION
app.get("/logout", auth, async (req, res) => {
  try {
    //TO GET TOKEN CREATED
    // console.log(req.user)

    //CLEARING THE TOKEN FROM DB AS WELL THIS WILL USED TO LOGOUT FROM SINGLE DEVICE
    req.user.tokens = req.user.tokens.filter((currElem) => {
      //REQ.TOKEN = IS THE TOKEN USED OR CREATED BY/FOR THE USER
      return currElem.token != req.token;
    });

    //FOR LOGGING OUT FROM ALL THE DEVICES
    // req.user.tokens=[];

    //DELETING THE COOKIE
    res.clearCookie("jwt");

    console.log("LOGOUT SUCCESSFUL !!..");

    //TO SAVE THE UPDATED TOKEN TO CLEAR COOKIE FROM OUR BROWSER
    await req.user.save();

    res.render("logout");
  } catch (e) {
    res.status(500).send("ERROR IN LOGOUT...");
  }
});

//HANDLING OTHER PAGE RENDERING
app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/bot", (req, res) => {
  res.render("bot");
});

//REGISTERING THE ROUTER
app.use(mainRouter);

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
