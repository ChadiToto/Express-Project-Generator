const { question, keyInYN } = require("readline-sync");

const {
  MODEL_MESSAGES,
  ERRORS,
  MODEL_TYPES,
  MENU_QUESTIONS,
} = require("../utils/constants");

const {
  capitalize,
  getCurrentModels,
  consoleError,
  processType,
} = require("../utils/helpers");

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
 * @returns {String} containing the reference
 */
function getRef() {
  let ref = "";
  let flag = true;

  let current_models = getCurrentModels();
  /* No Available Models */
  if (current_models.length === 0) {
    consoleError(ERRORS.NO_REFS);
    return "";
  }

  while (flag) {
    ref = question(MODEL_MESSAGES.REF);
    if (ref === "") return "";
    else if (!current_models.includes(ref))
      consoleError(ERRORS.INVALID_REF + current_models);
    else flag = false;
  }
  let type = `{ type: Schema.Types.ObjectId, ref: '${ref}' }`;
  return type;
}

/**
 * This function gets the typing for the current Field
 * It also controls the typing by forcing the user to enter a correct input @todo
 * @todo optimisation
 * @returns {String} type of the current field
 */
function getFieldType() {
  let type = "";
  let current_models = getCurrentModels().map((model) => model.toLowerCase());

  /* Field Typing Flags */
  let type_filter1 = false;
  let type_filter2 = false;

  /*Control Fields Until User's input is correct */
  do {
    type = question(MODEL_MESSAGES.TYPE).toLowerCase();
    /* If Array we need to Strip it from '[ ]' and remember that */
    const isArray = processType(type).isArray;
    type = processType(type).type;
    /* Type Filters */
    type_filter1 = !MODEL_TYPES.includes(type); // Filters Regular Typing
    type_filter2 = !current_models.includes(type); // Filters Embedded Types
    /* ObjectID Case */
    if (type === "objectid") type = getRef();
    else type = capitalize(type);
    /* If Array put back [ ] */
    if (isArray) type = "[" + type + "]";
    /* Special case : getRef() returns "" */
    if (type === "") {
      type_filter1 = true;
      type_filter2 = true;
      continue; // we don't want to display an error in this case
    }
    /* Error : Invalid Input */
    if (type_filter1 && type_filter2) {
      consoleError(ERRORS.TYPE);
      if (current_models.length !== 0)
        consoleError(ERRORS.EMBEDDED + current_models);
    }
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
