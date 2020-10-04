const fs = require("fs");
const path = require("path");
const { capitalize } = require("../utils/helpers");
const {
  setBody,
  setFields,
  setImport,
  modifyTemplate,
} = require("../utils/genHelpers");

const SRC = "./templates/";

/**
 * This function generates a model by modifying the template file
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

  const model_file = path.resolve(
    DST_DIR + "/" + model.name.toLowerCase() + ".js"
  );
  fs.copyFileSync(SRC_DIR, model_file);

  /* Modification of the template content */
  fs.readFile(model_file, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }

    /* Modify Template Values */
    const toReplace = [
      { old: /schemaName/g, new: model.name + "Schema" },
      { old: /modelName/g, new: model.name },
      { old: "fields", new: setFields(model) },
    ];
    var generated_values = modifyTemplate(toReplace, data);
    generated_values = setImport(generated_values, model); // Add imports if needed

    /* Apply Changes */
    fs.writeFileSync(model_file, generated_values, "utf8");

    console.log(("\nCreated Model : " + model.name).green);
  });
}

/**
 * This function generates a controller by modifying the template file
 * @param {Object} model containing model name and its fields
 */
function generateController(model) {
  const SRC_DIR = path.resolve(SRC + "controller.js");
  const DST_DIR = path.resolve("./controllers/");

  if (!fs.existsSync(DST_DIR)) {
    fs.mkdirSync(DST_DIR);
    fs.chmodSync(DST_DIR, 777);
  }

  const controller_file = path.resolve(
    DST_DIR + "/" + model.name.toLowerCase() + ".js"
  );
  fs.copyFileSync(SRC_DIR, controller_file);

  /* Modification of the template content */
  fs.readFile(controller_file, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }

    const toReplace = [
      { old: /Model/g, new: capitalize(model.name) },
      { old: /mymodel/g, new: model.name.toLowerCase() },
      { old: "fields", new: setBody(model) },
    ];

    /* Modify Template Values */
    const generated_values = modifyTemplate(toReplace, data);

    /* Apply Changes */
    fs.writeFileSync(controller_file, generated_values, "utf8");

    console.log(("Created Controller : " + model.name).green);
  });
}

module.exports = { generateModel, generateController };
