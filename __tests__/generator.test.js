const log = console.log;

test("createFiles should return 3 files", () => {
  const path = require("path");
  const { createFiles, deleteFiles } = require("../dist/generator");
  let component = "Foo";
  let structure = "solo-test-lazy";
  let expectedFiles: Array<string> = ["Foo.js", "Foo.test.js", "index.js"];
  let directory = "deleteMe";
  let createdFiles = createFiles(structure, component, directory);
  //Typecasting to string here in order to bypass weird typecasting issue
  expect(String(createdFiles)).toBe(String(expectedFiles));
  let deleteDirectory = path.join(__dirname, "../", directory);
  log(`Delete directory: ${deleteDirectory}`);
  deleteFiles(deleteDirectory);
});
