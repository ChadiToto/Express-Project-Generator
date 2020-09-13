const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ChadSchema = new Schema({
  Ok: String,
  kk: Number,
  la: Date,
});

module.exports = mongoose.model({ modelName }, schemaName);
