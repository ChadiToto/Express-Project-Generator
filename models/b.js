const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var bSchema = new Schema({ 
  ok: Ok,
 });

var b = mongoose.Model(modelName, bSchema);

module.exports = { modelName, bSchema };
