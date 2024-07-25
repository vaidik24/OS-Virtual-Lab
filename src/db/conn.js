const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://vaidik:Vaidik24@cluster0.yxtv0bz.mongodb.net/OS_VIRTUAL_LAB",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("Connection Successful to DB...");
  })
  .catch((e) => {
    console.log("No Connection Established...");
  });
