"use strict";

const fs = require("fs");
const mkdirp = require("mkdirp");
const path = require("path");
const chalk = require("chalk");
const log = console.log;

function getTemplatedFileNames(preferredFileStructure = "solo-test-lazy") {
  let formatConfig = path.join(__dirname, "../format.json");
  let formatObject = require(formatConfig);
  let structure = formatObject.structure;
  let templatedFileNames = grabValueOfKeyFromObject(preferredFileStructure, structure);
  return templatedFileNames;
}

function generator(components, fileStructure = "solo-test-lazy") {
  components.map(c => {
    let dir = createDirectory(c);
    try {
      let files = createFiles(fileStructure, c, dir);
      return files;
    } catch (error) {
      console.error(`${chalk.red("createFiles in generator failed.")} ${error}`);
    }
  });
}

function createDirectory(component) {
  mkdirp(component, err => {
    err ? console.error(`${chalk.red("Failed to createDirectory()")}: ${err}`) : log(`${component}`);
  });
  return component;
}

function createFile(component) {
  fs.writeFile(component, "", "utf-8", error => {
    error ? console.error(`${chalk.red("createFile() failed.")}:  ${error}`) : log(`${component} was created`);
  });
}
function createFiles(preferredFileStructure, component, directory) {
  let directoryInQuestion = path.join(__dirname, directory);
  let templatedFileNames = getTemplatedFileNames(preferredFileStructure);
  let createdFiles = [];
  if (templatedFileNames) {
    let files = templatedFileNames.map(tfn => {
      let file = tfn.replace(/([A-Z])\w+/, component);
      createdFiles.push(file);
      let here = path.join(process.cwd(), directory, file);
      createFile(here);
    });
    return createdFiles;
  } else {
    console.error(`${chalk.red("templatedFileNames is falsey. Current value: ")} ${templatedFileNames}`);
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
function deleteFiles(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) throw error;
    for (const file of files) {
      fs.unlink(path.join(directory, file), err => {
        if (err) throw error;
      });
    }
  });
}

module.exports = {
  generator,
  createDirectory,
  createFile,
  createFiles,
  deleteFiles
};