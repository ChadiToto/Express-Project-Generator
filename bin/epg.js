#!/usr/bin/env node

const { question, keyInYN } = require("readline-sync");
const { generateModel } = require("../utils/generator");
const colors = require("colors");
const cliProgress = require("cli-progress");

const MENU = [
  "1-Intialize Project",
  "2-Add Model/Controller",
  "3-Add Authentification",
  "4-Add Dockerfile",
];

const MENU_QUESTIONS = {
  CHOICE: "Your Choice ? [Press 'RETURN' to exit] :",
  EXIT: "Are you sure ? : ",
};

const PROGRESS = {
  format: "REST Generation {bar} {percentage}%  ",
  hideCursor: true,
};

const MODEL_MESSAGES = {
  NAME: "Whats your Model's name? [Press 'Return' to cancel] : ",
  FIELD: "Field Name [Press 'Return' to exit] : ",
  TYPE: "Field Type : ",
  ARRAY: "Array ? : ",
  NEW: "Create Another Model ? : ",
};

const ERRORS = {
  CHOICE: "Error : Invalid Choice",
  TYPE:
    "Error : Only available types are : ObjectId, String, Number, Date, Boolean, Mixed and Arrays",
};

const MODEL_TYPES = [
  "ObjectId",
  "String",
  "Number",
  "Date",
  "Boolean",
  "Mixed",
];

function exit(question) {
  let flag = true;
  if (keyInYN(question)) flag = false;
  return flag;
}

// TODO EMBEDDED & REF
function generateRest() {
  let model_flag = true; // This flag determins whether the user wants to create a model;
  let models = [];

  while (model_flag) {
    let fields = [];

    /* STEP 1 : Model Name */
    console.clear();
    let modelName = question(MODEL_MESSAGES.NAME);
    if (modelName === "") {
      // 'Return' Button pressed.
      model_flag = exit(MENU_QUESTIONS.EXIT);
      break;
    } else {
      let field_flag = true;

      /* STEP 2 : Create Fields */
      while (field_flag) {
        let field = {};
        field.name = question(MODEL_MESSAGES.FIELD);
        if (field.name === "") {
          // 'Return' Button pressed
          field_flag = exit(MENU_QUESTIONS.EXIT);
          break;
        }
        field.type = question(MODEL_MESSAGES.TYPE);
        /*Control Field Typing */

        let type_filter1 = !MODEL_TYPES.map((v) => v.toLowerCase()).includes(
          field.type.toLowerCase()
        ); // Filters Regular Typing

        let type_filter2 = !MODEL_TYPES.map(
          (v) => "[" + v.toLowerCase() + "]"
        ).includes(field.type.toLowerCase()); // Filters Arrays

        while (type_filter1 && type_filter2) {
          console.log(ERRORS.TYPE);
          field.type = question(MODEL_MESSAGES.TYPE);
          /* Reset Filters */
          type_filter1 = !MODEL_TYPES.map((v) => v.toLowerCase()).includes(
            field.type.toLowerCase()
          );
          type_filter2 = !MODEL_TYPES.map(
            (v) => "[" + v.toLowerCase() + "]"
          ).includes(field.type.toLowerCase());
        }

        fields.push(field);
      }
      models.push({ name: modelName, fields: fields });
    }
  }

  /* Step 3 : For every model entered generate a file */
  const bar = new cliProgress.Bar(PROGRESS, cliProgress.Presets.shades_grey);
  bar.start(models.length, 1);
  for (let i = 0; i < models.length; i++) {
    generateModel(models[i]);
    bar.update(i + 1);
  }
  bar.stop();
}

function menu() {
  console.clear();
  for (let option of MENU) {
    console.log(option);
  }

  let choice = question(MENU_QUESTIONS.CHOICE);

  switch (choice) {
    case "1":
      //TODO INTIALIZE PROJECT
      break;
    case "2": // TODO ADVANCED MODELS
      generateRest();
      break;
    case "3":
      //TODO AUTHENTIFICATION
      break;
    case "4":
      //TODO DOCKERFILE
      break;
    default:
      console.error(ERRORS.CHOICE.red);
      break;
  }
}

menu();
