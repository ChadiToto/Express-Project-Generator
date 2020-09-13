const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var VoitureSchema = new Schema({
  Numero: String,
  Marque: String,
});

module.exports = mongoose.model({ modelName }, schemaName);
