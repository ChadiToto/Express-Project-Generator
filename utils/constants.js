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
  NEW: "Create Another Model ? : ",
};

const ERRORS = {
  CHOICE: "Error : Invalid Choice",
  TYPE:
    "Error : Only available types are : ObjectId, String, Number, Date, Boolean, Mixed and Arrays",
  MODEL_NAME="",
  FIELD_NAME="",
};

const MODEL_TYPES = [
  "ObjectId",
  "String",
  "Number",
  "Date",
  "Boolean",
  "Mixed",
];

module.exports = {
  MENU,
  MENU_QUESTIONS,
  PROGRESS,
  MODEL_MESSAGES,
  ERRORS,
  MODEL_TYPES,
};
