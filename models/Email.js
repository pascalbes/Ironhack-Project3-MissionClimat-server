const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  email: {type:String, required:true, unique:true},
});

const Email = mongoose.model("Email", schema);

module.exports = Email;