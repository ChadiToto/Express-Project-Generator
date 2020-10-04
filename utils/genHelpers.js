const { MODEL_TYPES } = require("./constants");
const { removeDuplicates, processArrays } = require("./helpers");
const path = require("path");
const fs = require("fs");

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
 * This function gets all the fields of the model and its types to insert in Model.js
 * @param {Object} model containg model name and its fields
 * @returns {String} of Field and Type pairs
 */
function setFields(model) {
  let mongoose_field = "\n";
  for (let field of model.fields) {
    mongoose_field += "  " + field.name + ": " + field.type + ",\n";
  }
  return mongoose_field;
}

/**
 * This function maps model fields with req.body to insert in Controller file (Create function)
 * @param {*} model
 * @returns {String} of Field and req.body pairs
 */
function setBody(model) {
  let init = "\n";
  for (let field of model.fields) {
    init += "\t\t" + field.name + ": req.body." + field.name + ",\n";
  }
  return init;
}

function copyTemplate(src, dst, model) {
  const SRC_DIR = path.resolve(src);
  const DST_DIR = path.resolve(dst);

  if (!fs.existsSync(DST_DIR)) {
    fs.mkdirSync(DST_DIR);
    fs.chmodSync(DST_DIR, 777);
  }

  const generated_file = path.resolve(
    DST_DIR + "/" + model.name.toLowerCase() + ".js"
  );
  fs.copyFileSync(SRC_DIR, generated_file);

  return generated_file;
}

/**
 * This function replaces Template values with new values
 * @param {Array} values of Objects containing Old Values & New Values
 */
function modifyTemplate(values, template) {
  for (let value of values) {
    template = template.replace(value.old, value.new);
  }
  return template;
}

module.exports = {
  setImport,
  setFields,
  setBody,
  copyTemplate,
  modifyTemplate,
};
