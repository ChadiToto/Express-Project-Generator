const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var okSchema = new Schema({ 
  ok: String,
 });

var ok = mongoose.Model(modelName, okSchema);

module.exports = { modelName, okSchema };
