const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var { okSchema } = require("./ok.js");

var embedSchema = new Schema({
  ok: Ok,
});

var embed = mongoose.Model(modelName, embedSchema);

module.exports = { modelName, embedSchema };
