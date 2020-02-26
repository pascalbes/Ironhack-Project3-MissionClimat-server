const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to the db");
  })
  .catch(err => {
    console.log(err);
  });
