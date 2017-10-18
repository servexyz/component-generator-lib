const fs = require("fs");
const mkdirp = require("mkdirp");
const path = require("path");
const chalk = require("chalk");
const log = console.log;

function generator(
  components: Array<string>,
  fileStructure: string = "solo-test-lazy"
) {
  components.map(c => {
    let dir = createDirectory(c);
    log(`Dir: ${dir}`);
    try {
      let files: Array<string> = createFiles(fileStructure, c, dir);
      log(`files in generator: ${files}`);
      return files;
    } catch (error) {
      console.error(
        `${chalk.red("createFiles in generator failed.")} ${error}`
      );
    }
  });
}
function createDirectory(component: string) {
  mkdirp(component, err => {
    err
      ? console.error(`Failed to createDirectory. ${err}`)
      : log(`${component}`);
  });
  return component;
}
function createFile(component: string) {
  fs.writeFile(component, "", "utf-8", error => {
    error
      ? console.error(`createFile() failed. ${error}`)
      : log(`${component} was created`);
  });
}

function createFiles(preferredFileStructure, component, directory) {
  var formatConfig: string = path.join(__dirname, "/format.json");
  var formatObject: Object = require(formatConfig);
  var structure: mixed = formatObject.structure;
  //problem is line below... templatedFileNames is undefined
  let templatedFileNames = grabValueOfKeyFromObject(
    preferredFileStructure,
    structure
  );
  log(`\n\nTemplatedFileNames: ${templatedFileNames}`);
  log("\n\nStructure: " + JSON.stringify(structure));
  if (templatedFileNames) {
    let files = templatedFileNames.map(tfn => {
      let file = tfn.replace(/([A-Z])\w+/, component);
      let here = path.join(process.cwd(), directory, file);
      createFile(here);
    });
    return files;
  } else {
    console.log(
      `${chalk.red(
        "templatedFileNames isn't defined. Current value: "
      )} ${templatedFileNames}`
    );
    return false;
  }
}

function grabValueOfKeyFromObject(
  key: string,
  obj: mixed
): Array<string> | mixed {
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
  createFiles
};
