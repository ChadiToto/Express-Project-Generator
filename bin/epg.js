#!/usr/bin/env node

const {
  MENU,
  MENU_QUESTIONS,
  PROGRESS,
  MODEL_MESSAGES,
  ERRORS,
} = require("../utils/constants");

const { question } = require("readline-sync");
const { generateModel } = require("../lib/generator");
const cliProgress = require("cli-progress");

const { getFields, exit } = require("../utils/genHelpers");

// TODO EMBEDDED & REF
function generateRest() {
  let model_flag = true; // This flag determins whether the user wants to create a model;
  let models = [];

  while (model_flag) {
    console.clear();
    let fields = [];
    /* STEP 1 : Model Name */
    let modelName = question(MODEL_MESSAGES.NAME);
    if (modelName === "") {
      // 'Return' Button pressed.
      model_flag = exit(MENU_QUESTIONS.EXIT);
      break;
    } else {
      /* Step 2 : Get Fields and Typing */
      fields = getFields();
    }
    models.push({ name: modelName, fields: fields });
  }

  /* Step 3 : For every model entered generate Model/Controllers/Route files */
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
