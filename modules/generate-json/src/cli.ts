const mri = require("mri");
const fs = require("fs");
const mkdirp = require("mkdirp");
const { generateJson } = require("./index");
const pkg = require("../package.json");
console.log(`
Version : ${pkg.version}
`);

const args = process.argv.slice(2);

const { _ } = mri(args);

if (_.length < 2) {
  throw new Error(`Expected 2 arguments, <schemaFilePath> <outputFilePath>`);
}
const [schemaFilePath, outputDirPath] = _;
const schemaFile = require(`${process.cwd()}/${schemaFilePath}`);
const { schema, keyReducers, count } = schemaFile;

const { tree, values, keys } = generateJson({ schema, keyReducers, count });
const outputDir = `${process.cwd()}/${outputDirPath}`;
mkdirp(outputDir);
fs.writeFileSync(`${outputDir}/tree.json`, JSON.stringify(tree), {
  encoding: "utf8"
});
fs.writeFileSync(`${outputDir}/values.json`, JSON.stringify(values), {
  encoding: "utf8"
});
fs.writeFileSync(`${outputDir}/keys.json`, JSON.stringify(keys), {
  encoding: "utf8"
});
console.log(`✅ Ok. 
Check ${outputDir} 
to see the generated data.
`);
