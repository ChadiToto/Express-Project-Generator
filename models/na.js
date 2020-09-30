const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var naSchema = new Schema({ 
  ok: Ok,
 });

var na = mongoose.Model(modelName, naSchema);

module.exports = { modelName, naSchema };
