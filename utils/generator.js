const fs = require("fs");
const path = require("path");

const SRC = "../templates/";

/**
 * This function gets all the fields of the model and its types
 * @param {Object} model containg model name and its fields
 * @returns {String} of Field and Type pairs
 */
function getFields(model) {
  let mongoose_field = "\n";
  for (let field of model.fields) {
    mongoose_field += "  " + field.name + ": " + field.type + ",\n";
  }
  return mongoose_field;
}

/**
 * This function generates a model by modifying the template file
 * @param {Object} model containing model name and its fields
 */
function generateModel(model) {
  const SRC_DIR = path.resolve(SRC + "model.js");
  const DST_DIR = path.resolve("../models/");

  /* Create the "models" directory if doesn't exist */
  if (!fs.existsSync(DST_DIR)) {
    fs.mkdirSync(DST_DIR);
    fs.chmodSync(DST_DIR, 777);
  }

  const model_file = path.resolve(DST_DIR + "/" + model.name + ".js");
  fs.copyFileSync(SRC_DIR, model_file);

  /* Modification of the template content */
  fs.readFile(model_file, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }

    /* Change Schema name */
    var result = data.replace("schemaName", model.name + "Schema");
    fs.writeFileSync(model_file, result, "utf8");

    /* Insert Fields */
    let fields = result.replace("fields", getFields(model));
    fs.writeFileSync(model_file, fields, "utf8");

    /* Change Model name */
  });
}

module.exports = { generateModel };
