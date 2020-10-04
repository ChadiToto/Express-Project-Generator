const execSync = require("child_process").execSync;
const colors = require("colors");

function processType(type) {
  let isArray = false;
  if (type.startsWith("[")) {
    type = type.slice(1, type.length - 1);
    isArray = true;
  }
  return { type, isArray };
}

function processArrays(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = processType(arr[i]).type;
  }
  return arr;
}

function removeDuplicates(arr) {
  let unique = [...new Set(arr)];
  return unique;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function consoleError(str) {
  console.log(str.red);
}

function getCurrentModels() {
  try {
    let current_models = execSync(`ls ./models`, {
      encoding: "utf-8",
    }).split("\n");
    current_models = current_models.map((v) => v.slice(0, -3)); // Remove .js extension
    current_models.pop();
    return current_models;
  } catch (e) {
    return [];
  }
}

module.exports = {
  capitalize,
  getCurrentModels,
  consoleError,
  removeDuplicates,
  processArrays,
  processType,
};
