const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var schemaName = new Schema({ fields });

var modelName = mongoose.Model(modelName, schemaName);

module.exports = { modelName, schemaName };
