require("dotenv").config();
const jwt = require("jsonwebtoken");
const LoginForm = require("../models/reg");


const auth = async (req, res, next) => {
    try {
        //GETTING THE TOKEN FROM COOKIE USING COOKIE-PARSER
        const token = req.cookies.jwt;

        //VERIFYING THE USER BY CHECKING THE VALUE OF SECRET KEY AND THE TOKEN
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        // console.log(verifyUser);

        const user = await LoginForm.findOne({ _id: verifyUser._id });
        // console.log(user);

        //ENABLING THE LOGOUT FEATURE FROM ONE DEVICE BY DELETING THE COOKIE CREATED

        //GETTING THE TOKEN VALUE OF USER AND THE TOKEN I.E SAVED IN DB 
        req.token = token;
        req.user = user;


        //THIS IS USED TO MAKE THE RENDERING OF PAGE IF USER IS VALID
        next();


    } catch (e) {
        res.status(404).render("404error");
    }
}

module.exports = auth;