const log = console.log;

test("createFiles should return 3 files", () => {
  const { createFiles, blah } = require("../dist/generator");
  let component = "Foo";
  let structure = "solo-test-lazy";
  let expectedFiles: Array<string> = ["Foo.js", "Foo.test.js", "index.js"];
  let directory = "deleteMe";
  let createdFiles = createFiles(structure, component, directory);
  log(`typeof createdFiles: ${typeof createdFiles}`);
  log(`typeof expectedFiles: ${typeof expectedFiles}`);
  expect(String(createdFiles)).toBe(String(expectedFiles));
});

// test("module should export generator", () => {
//   const generator = require("../index");
//   let components = "Foo";
//   let structure = "solo-test-lazy";
//   let expectedFiles = ["Foo.js", "Foo.test.js", "index.js"];
//   let actualFiles = generator(components, structure);
//   expect(actualFiles).toBe(expectedFiles);
// });
