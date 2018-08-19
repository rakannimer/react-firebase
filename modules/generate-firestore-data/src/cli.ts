const mri = require("mri");
const fs = require("fs");
const firebase = require("firebase-admin");
const { generateFirestoreData } = require("./index");
const pkg = require("../package.json");

const main = async () => {
  console.log(`
Version : ${pkg.version}
`);

  const args = process.argv.slice(2);

  const { _ } = mri(args);

  if (_.length < 2) {
    throw new Error(
      `Expected 2 arguments, <schemaFilePath> <credentialsFilePath>`
    );
  }

  const [schemaFilePath, credentialsFilePath] = _;
  const schemaFile = require(`${process.cwd()}/${schemaFilePath}`);
  const credentialsFile = require(`${process.cwd()}/${credentialsFilePath}`);

  const { schema, keyReducers, count } = schemaFile;
  const { credential, databaseURL } = credentialsFile;
  console.log("Generating Data");
  await generateFirestoreData(
    { schema, keyReducers, count },
    { credential, databaseURL, firebase }
  );
  console.log("Done");
  process.exit(0);
};
(async () => {
  await main();
})();
