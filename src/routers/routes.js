require("dotenv").config();
const express = require("express");

const router = express.Router();

const RoundRobin = require("../models/rr");

const BankerAlgorithm = require("../models/ba");

const ScanAlgorithm = require("../models/sc");

const MruAlgorithm = require("../models/mr");

const LoginForm = require("../models/reg");

const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const auth = require("../middleware/auth");

//ROUTES TO MAIN PAGES
router.get("/", (req, res) => {
  res.render("index");
});

router.get("/cardos", auth, (req, res) => {
  res.render("cardos");
});

router.get("/read", (req, res) => {
  res.render("readmore");
});

router.get("/about", (req, res) => {
  res.render("aboutus");
});

router.get("/rralgo", (req, res) => {
  res.render("rralgo");
});

router.get("/rrtext", (req, res) => {
  res.render("rrtext");
});

router.get("/rrvideo", (req, res) => {
  res.render("rrvideo");
});

//ROUTES FOR BANKER'S ALGO
router.get("/bk", (req, res) => {
  res.render("bk");
});

router.get("/bktext", (req, res) => {
  res.render("bankertext");
});

router.get("/bkvideo", (req, res) => {
  res.render("bankervideo");
});

//ROUTES FOR SCAN ALGO
router.get("/salgo", (req, res) => {
  res.render("scanalgo");
});

router.get("/stext", (req, res) => {
  res.render("scantext");
});

router.get("/svideo", (req, res) => {
  res.render("scanvideo");
});

//ROUTES FOR MRU ALGO
router.get("/malgo", (req, res) => {
  res.render("mru");
});

router.get("/mtext", (req, res) => {
  res.render("mrutext");
});

router.get("/mvideo", (req, res) => {
  res.render("mruvideo");
});

//POST ROUTES FOR RR ALGO
router.post("/rralgo", async (req, res) => {
  try {
    console.log("In the post method");
    const rrData = new RoundRobin({
      filename: req.body.user1,
      QuantumTime: req.body.qtime,
      AvgCompletionTime: req.body.acompt,
      AvgTAT: req.body.atat,
      AvgResponseTime: req.body.art,
      AvgWaitingTime: req.body.awaitt,
      Throughput: req.body.thrptt,
    });

    const realData = await rrData.save();
    console.log(realData);
    res.status(201).render("cardos");
  } catch (e) {
    res.status(500).send("Error in Saving Data" + e);
    console.log("Error in the page" + e);
  }
});

//POST ROUTES FOR BANKER ALGO
router.post("/bk", async (req, res) => {
  try {
    console.log("In the post method");
    const bkData = new BankerAlgorithm({
      filename: req.body.user,
      Total_A_Res: req.body.apinput,
      Total_B_Res: req.body.bpinput,
      Total_C_Res: req.body.cpinput,
      Res_Alloc: req.body.resaloc,
      Deadlock_State: req.body.deadl,
      Safe_Sequence: req.body.safes,
    });

    const realData = await bkData.save();
    console.log(realData);
    res.status(201).render("cardos");
  } catch (e) {
    res.status(500).send("Error in Saving Data" + e);
    console.log("Error in the page" + e);
  }
});

//POST ROUTES FOR SCAN ALGO
router.post("/salgo", async (req, res) => {
  try {
    console.log("In the post method");
    const scData = new ScanAlgorithm({
      filename: req.body.user,
      Method_Name: req.body.algoselector,
      Track: req.body.TraclSelector,
      Total_Tracks: req.body.total,
      Starting_Track: req.body.start,
      Time_Taken_Per_Track: req.body.time,
      Total_Tracks_Travelled: req.body.trackt,
      Total_Time_Taken: req.body.totalt,
    });

    const realData = await scData.save();
    console.log(realData);
    res.status(201).render("cardos");
  } catch (e) {
    res.status(500).send("Error in Saving Data" + e);
    console.log("Error in the page" + e);
  }
});

//POST ROUTES FOR MRU ALGO
router.post("/malgo", async (req, res) => {
  try {
    console.log("In the post method");
    const mrData = new MruAlgorithm({
      filename: req.body.user,
      No_of_Frames: req.body.frame,
      Total_Hits: req.body.hits,
      Total_Miss: req.body.miss,
      Hit_Ratio: req.body.hitratio,
      Miss_Ratio: req.body.missratio,
    });

    const realData = await mrData.save();
    console.log(realData);
    res.status(201).render("cardos");
  } catch (e) {
    res.status(500).send("Error in Saving Data" + e);
    console.log("Error in the page" + e);
  }
});

//HANDLING LOGIN FORMS

// //HANDLING THE POST REQUEST ON REGISTER FORM
// router.post("/register", async (req, res) => {
//     try {
//         const password = req.body.pass;
//         const cpassword = req.body.cpass;

//         if (password === cpassword) {
//             //ADDING DATA TO DB
//             const regData = new LoginForm({
//                 firstname: req.body.fname,
//                 lastname: req.body.lname,
//                 gender: req.body.gender,
//                 phone: req.body.Pnumber,
//                 email: req.body.emailID,
//                 age: req.body.age,
//                 password: req.body.pass,
//                 confirmPassword: req.body.cpass
//             })

//             //GENERATING JWT USING MIDDLEWARE WHILE REGISTERING
//             const token = await regData.generateAuthToken();

//             //GENERATING COOKIES FOR THE TOKEN GENERATED ABOVE TO SAVE INFO OF THE LOGGED IN USER

//             /*
//             res.cookie() = function is used to set the cookie name to value.
//             the value parameter may be a string or object converted to JSON.
//             */

//             res.cookie("jwt", token, {
//                 expires: new Date(Date.now() + 30000),
//                 httpOnly: true    //THIS IS DONE TO DON'T PERMIT CLIENT SIDE SCRIPTING LANGUAGE TO REMOVE COOKIE CREATED
//                 // secure:true    //ENABLES COOKIE TO WORK ONLY ON "HTTPS"
//             })

//             //GETTING COOKIE VALUES USING COOKIE-PARSER
//             // console.log(req.cookies.jwt);

//             //SAVING DATA TO DB
//             const realData = await regData.save();

//             //RENDERING TO MAIN PAGE
//             res.status(201).render("index");

//         } else {
//             res.send("PASSWORDS ARE NOT MATCHING");
//         }

//     } catch (e) {
//         res.status(404).send(e);
//         console.log("Error in the Register page..." + e)
//     }
// });

// //HANDLING LOGIN REQUEST ON LOGIN FORM USING POST REQUEST
// router.post("/login", async (req, res) => {
//     try {
//         //GETTING EMAIL AND PASSWORD
//         const email = req.body.email;
//         const password = req.body.pass;

//         //CHECKING EMAIL FROM DB
//         const userEmail = await LoginForm.findOne({ email: email });

//         //CHECKING THE HASH VALUE OF PASSWORD
//         const isMatch = await bcryptjs.compare(password, userEmail.password);

//         //GENERATING THE TOKEN WHILE LOGIN
//         const token = await userEmail.generateAuthToken();
//         // console.log(token);

//         //GENERATING COOKIE AND PASSING TOKEN TO IT
//         res.cookie("jwt", token, {
//             expires: new Date(Date.now() + 500000),
//             httpOnly: true,   //THIS IS DONE TO DON'T PERMIT CLIENT SIDE SCRIPTING LANGUAGE TO REMOVE COOKIE CREATED
//             // secure:true    //ENABLES COOKIE TO WORK ONLY ON "HTTPS"
//         })

//         // console.log();
//         //GETTING THE COOKIG VALUE USING COOKIE-PARSER
//         // console.log(`This is the required cookie ${req.cookies.jwt}`);

//         // CHECKING AND MATCHING PASSWORD FROM DB
//         if (isMatch) {

//             res.status(201).render("index");
//         }
//         else {
//             res.status(400).send("Invalid Login Details Please Try again !!");
//         }
//     } catch (e) {
//         res.status(404).send("Invalid Login Details Please Try again !!" + e)
//     }
// })

// //HANDLING GET REQUEST

// // HANDLING REMOVAL OF COOKIES AND LOGOUT FUNCTION
// router.get("/logout", auth, async (req, res) => {
//     try {
//         //TO GET TOKEN CREATED
//         // console.log(req.user)

//         //CLEARING THE TOKEN FROM DB AS WELL THIS WILL USED TO LOGOUT FROM SINGLE DEVICE
//         // req.user.tokens = req.user.tokens.filter((currElem) => {

//         //     //REQ.TOKEN = IS THE TOKEN USED OR CREATED BY/FOR THE USER
//         //     return currElem.token != req.token;
//         // })

//         //FOR LOGGING OUT FROM ALL THE DEVICES
//         req.user.tokens=[];

//         //DELETING THE COOKIE
//         res.clearCookie("jwt");

//         console.log("LOGOUT SUCCESSFUL !!..")

//         //TO SAVE THE UPDATED TOKEN TO CLEAR COOKIE FROM OUR BROWSER
//         await req.user.save();

//         res.render("logout")
//     } catch (e) {
//         res.status(500).send("ERROR IN LOGOUT...");
//     }
// })

// //HANDLING OTHER PAGE RENDERING
// router.get("/login", (req, res) => {
//     res.render("login")
// })

// router.get("/register", (req, res) => {
//     res.render("register")
// })

router.get("*", (req, res) => {
  res.render("404error", {
    errormsg: "Oops! Sorry the Page you are Looking For DNE...",
  });
});

module.exports = router;
