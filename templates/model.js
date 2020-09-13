const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var schemaName = new Schema({fields});

module.exports = mongoose.model(modelName, schemaName);
