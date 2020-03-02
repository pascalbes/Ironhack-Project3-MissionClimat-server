const mongoose = require("mongoose");
// hey express, i would like to use mongoose to get a connection to my mongodb server
mongoose
.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(dbConnectionResult =>
  // everything is good ^^
  console.log(`Connected to Mongo! Database name: "${dbConnectionResult.connections[0].name}"`)
)
.catch(err => {
  // an error occured
  console.error("Error connecting to mongo", err)
});


/// npm install mongoose !!!