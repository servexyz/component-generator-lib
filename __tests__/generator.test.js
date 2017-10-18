test("createFiles should return 3 files", () => {
  const { createFiles } = require("../dist/generator");
  let component = "Foo";
  let structure = "solo-test-lazy";
  let expectedFiles = ["Foo.js", "Foo.test.js", "index.js"];
  let directory = "deleteMe";
  let createdFiles = createFiles(expectedFiles, component, directory);
  expect(createdFiles).toBe(expectedFiles);
});

// test("module should export generator", () => {
//   const generator = require("../index");
//   let components = "Foo";
//   let structure = "solo-test-lazy";
//   let expectedFiles = ["Foo.js", "Foo.test.js", "index.js"];
//   let actualFiles = generator(components, structure);
//   expect(actualFiles).toBe(expectedFiles);
// });
