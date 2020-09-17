const { question, keyInYN } = require("readline-sync");
const execSync = require("child_process").execSync;

const {
  MODEL_MESSAGES,
  ERRORS,
  MODEL_TYPES,
  MENU_QUESTIONS,
} = require("../utils/constants");
const { capitalize } = require("./helpers");

/**
 * This function exits the current context
 * @param {String} question
 */
function exit(question) {
  let flag = true;
  if (keyInYN(question)) flag = false;
  return flag;
}

/**
 * This function adds a reference to the current Field
 */
function getRef() {
  let ref = "";
  let flag = true;
  let current_models = execSync(`ls ./models`, {
    encoding: "utf-8",
  }).split("\n");
  current_models = current_models.map((v) => v.slice(0, -3)); // Remove .js extension
  while (flag) {
    ref = question(MODEL_MESSAGES.REF);
    if (ref === "") return "";
    else if (!current_models.includes(ref))
      console.log((ERRORS.INVALID_REF + current_models).red);
    else flag = false;
  }
  let type = `{ type: Schema.Types.ObjectId, ref: '${ref}' }`;
  return type;
}

/**
 * This function gets the typing for the current Field
 * It also controls the typing by forcing the user to enter a correct input
 * @returns {String} type of the current field
 */
function getFieldType() {
  let type = "";

  /* Field Typing Flags */
  let type_filter1 = false;
  let type_filter2 = false;

  /*Control Fields Until Users input is correct */
  do {
    type = question(MODEL_MESSAGES.TYPE).toLowerCase();
    /* Type Filters */
    type_filter1 = !MODEL_TYPES.includes(type); // Filters Regular Typing
    type_filter2 = !MODEL_TYPES.map((v) => "[" + v + "]").includes(type); // Filters Arrays
    /* Error : Invalid Input */
    if (type_filter1 && type_filter2) console.log(ERRORS.TYPE.red);
    /* ObjectID Case */
    if (type === "objectid") type = getRef();
    else if (type === "[objectid]") type = "[" + getRef() + "]";
    else type = capitalize(type);
  } while (type_filter1 && type_filter2);
  return type;
}

/**
 * This function Gets the fields of the current model using the user's input
 * @returns {Array} of Objects containing the Field names & types
 */
function getFields() {
  let field_flag = true; // this flag whether the users wants to add a new Field
  let fields = [];

  while (field_flag) {
    let field = {}; // current field
    field.name = question(MODEL_MESSAGES.FIELD);
    if (field.name === "") {
      // 'Return' Button pressed
      field_flag = exit(MENU_QUESTIONS.EXIT);
      break;
    }
    field.type = getFieldType();
    fields.push(field);
  }
  return fields;
}

module.exports = { getFields, exit };
