"use strict";

const fs = require("fs");
const mkdirp = require("mkdirp");
const path = require("path");
const chalk = require("chalk");
const log = console.log;

function getTemplatedFileNames(preferredFileStructure = "solo-test-lazy") {
  log(`Dirname: ${__dirname}`);
  log(`Filename: ${__filename}`);
  log(`${chalk.blue("preferredFileStructure in gtfn()")}': ${preferredFileStructure}`);
  let formatConfig = path.join(__dirname, "../format.json");
  log(`Format config in getTFN: ${formatConfig}`);
  let formatObject = require(formatConfig);
  let structure = formatObject.structure;
  log(`Structure from getTemplatedFileNames: ${JSON.stringify(structure)}`);
  let templatedFileNames = grabValueOfKeyFromObject(preferredFileStructure, structure);
  log(`tfn from getTemplatedFileNames: ${templatedFileNames}`);
  return templatedFileNames;
}

function blah() {
  let preferredFileStructure = "solo-test-lazy";
  let formatConfig = path.join(__dirname, "../format.json");
  log(`Format config in blah: ${formatConfig}`);
  log(`Dirname: ${__dirname}`);
  log(`Filename: ${__filename}`);
  let formatObject = require(formatConfig);
  // log(`${chalk.green("formatConfig")}: ${JSON.stringify(formatObject)}`);
  let structure = formatObject.structure;
  log(`Structure from blah(): ${JSON.stringify(structure)}`);
  let templatedFileNames = grabValueOfKeyFromObject(preferredFileStructure, structure);
  log(`${chalk.green("tfn from blah()")}: ${templatedFileNames}`);
}
function generator(components, fileStructure = "solo-test-lazy") {
  components.map(c => {
    let dir = createDirectory(c);
    log(`Dir: ${dir}`);
    try {
      let files = createFiles(fileStructure, c, dir);
      log(`files in generator: ${files}`);
      return files;
    } catch (error) {
      console.error(`${chalk.red("createFiles in generator failed.")} ${error}`);
    }
  });
}
function createDirectory(component) {
  mkdirp(component, err => {
    err ? console.error(`Failed to createDirectory. ${err}`) : log(`${component}`);
  });
  return component;
}
function createFile(component) {
  fs.writeFile(component, "", "utf-8", error => {
    error ? console.error(`createFile() failed. ${error}`) : log(`${component} was created`);
  });
}

function createFiles(preferredFileStructure, component, directory) {
  let templatedFileNames = getTemplatedFileNames(preferredFileStructure);
  if (templatedFileNames) {
    let files = templatedFileNames.map(tfn => {
      let file = tfn.replace(/([A-Z])\w+/, component);
      let here = path.join(process.cwd(), directory, file);
      createFile(here);
    });
    return files;
  } else {
    console.log(`${chalk.red("templatedFileNames isn't defined. Current value: ")} ${templatedFileNames}`);
    return false;
  }
}
function grabValueOfKeyFromObject(key, obj) {
  for (const [k, v] of Object.entries(obj)) {
    if (k == key) {
      return v;
    }
  }
}

module.exports = {
  generator,
  createDirectory,
  createFile,
  createFiles,
  blah
};