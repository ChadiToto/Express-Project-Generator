const fs = require("fs");
const path = require("path");
const { MODEL_TYPES } = require("../utils/constants");
const { removeDuplicates, processArrays } = require("../utils/helpers");

const SRC = "./templates/";

/**
 * This function add Imports in the case of an embedded field
 * @param {*} data
 * @param {*} model
 * @todo remove shit
 */
function setImport(data, model) {
  line = 2;
  const primative_types = MODEL_TYPES.map((v) => v.toLowerCase());

  /* First we need to pre-process our model field types */
  let fields = model.fields.map((v) => v.type);
  fields = removeDuplicates(fields); // We don't want to import the same Schema twice or more
  fields = processArrays(fields); // We don't want annoying [ ] to handle when we start proccessing

  /* Start Processing */
  for (let field of fields) {
    let type = field.toLowerCase();
    // if a field isn't primative then its embedded
    if (!primative_types.includes(type)) {
      let _import =
        "var { " + field + "Schema } = require('./" + type + ".js')"; // String to be added
      let re = new RegExp(field, "g"); // Regexp to be replaced
      data = data.replace(re, type + "Schema"); // replace Regexp
      /* String inclusion into specific line */
      data = data.toString().split("\n");
      data.splice(line, 0, _import);
      data = data.join("\n");
      line++;
    }
  }
  return data;
}

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
 * @todo IMPORT Embedded Document
 * @param {Object} model containing model name and its fields
 */
function generateModel(model) {
  const SRC_DIR = path.resolve(SRC + "model.js");
  const DST_DIR = path.resolve("./models/");

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
    generated_values = generated_values.replace(/modelName/g, model.name); // Change Model Name
    generated_values = setImport(generated_values, model); // Add imports if needed

    /* Apply Changes */
    fs.writeFileSync(model_file, generated_values, "utf8");

    console.log(("\nCreated Model : " + model.name).green);
  });
}

module.exports = { generateModel };
