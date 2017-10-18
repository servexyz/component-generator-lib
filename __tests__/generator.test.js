const { generator, createFiles } = require("../dist/generator");

test("createFiles should return Navbar.js, Navbar.test.js & index.js", () => {
  let files = ["Navbar.js", "Navbar.test.js", "index.js"];
  expect(createFiles("solo-test-lazy", "Navbar", "deleteMe")).toBe(files);
});

test("module should export generator", () => {
  const generator = require("../index");
  let components = "Foo";
  let structure = "solo-test-lazy";
  let expectedFiles = ["Foo.js", "Foo.test.js", "index.js"];
  let actualFiles = generator(components, structure);
  expect(actualFiles).toBe(expectedFiles);
});
