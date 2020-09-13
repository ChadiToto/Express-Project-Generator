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

    /* Modify Template Values */
    var generated_values = data.replace(/schemaName/g, model.name + "Schema"); // Change Schema Name
    generated_values = generated_values.replace("fields", getFields(model)); // Insert Fields
    generated_values = generated_values.replace("modelName", model.name); // Change Model Name

    /* Apply Changes */
    fs.writeFileSync(model_file, generated_values, "utf8");
  });
}

module.exports = { generateModel };
