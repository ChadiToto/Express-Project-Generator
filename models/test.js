const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var TestSchema = new Schema({ 
  Ok: String,
 });

var Test = mongoose.Model(Test, TestSchema);

module.exports = { Test, TestSchema };
