const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var OkkkSchema = new Schema({ 
  ok: String,
  okk: String,
 });

module.exports = mongoose.model({ modelName }, schemaName);
