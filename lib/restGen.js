const fs = require("fs");
const { capitalize } = require("../utils/helpers");
const {
  setBody,
  setFields,
  setImport,
  modifyTemplate,
  copyTemplate,
} = require("../utils/genHelpers");

/**
 * This function generates a model by modifying the template file
 * @param {Object} model containing model name and its fields
 */
function generateModel(model) {
  /* Copy Template to Folder */
  const model_file = copyTemplate("./templates/model.js", "./models/", model);

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
  /* Copy Template to Folder */
  const controller_file = copyTemplate(
    "./templates/controller.js",
    "./controllers/",
    model
  );

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

    console.log(("Created Controller For Model : " + model.name).green);
  });
}

function generateRoutes(model) {
  /* Copy Template to Folder */
  const router_file = copyTemplate("./templates/route.js", "./routes/", model);

  /* Modification of the template content */
  fs.readFile(router_file, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }

    const toReplace = [
      { old: /modelController/g, new: capitalize(model.name) },
      { old: /mycontroller/g, new: model.name.toLowerCase() },
    ];

    /* Modify Template Values */
    const generated_values = modifyTemplate(toReplace, data);

    /* Apply Changes */
    fs.writeFileSync(router_file, generated_values, "utf8");

    console.log(("Created Route For Model : " + model.name).green);
  });
}

module.exports = { generateModel, generateController, generateRoutes };
