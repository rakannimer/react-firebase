# Generate Firestore Data

This module is meant to run on node NOT on the browser or react-native.

Use this in your node server or on cli tools.

## Installation

### API

```sh
  yarn add generate-firestore-data
  # If you don't already have firebase-admin as a dependency then add it too
  yarn add firebase-admin
```

### CLI

```sh
  # In your project :
  yarn add -D generate-firestore-data
  yarn generate-firestore-data <schemaFilePath> <credentialsFilePath>

  # Or globally :
  npm i -g generate-firestore-data
  generate-firestore-data <schemaFilePath> <credentialsFilePath>
```

## Programmatic Usage

1. First you need a Private Key from firebase for privileged environments, find out how to get it here: https://firebase.google.com/docs/admin/setup (or replace YOUR_PROJECT_NAME_HERE with your project name here : https://console.firebase.google.com/project/YOUR_PROJECT_NAME_HERE/settings/serviceaccounts/adminsdk)

2. Place that private key .json file somewhere in your project.
3. Take note of your databaseURL
4. Create a schema for the data schema. Check [generate-json](https://github.com/rakannimer/generate-json) or [the examples](./examples-schemas/) for the schema format.

```javascript
// Import it in your project

import { generateFirestoreData } from "generate-firestore-data";
// Or
const { generateFirestoreData } = require("generate-firestore-data");

// Import firebase-admin
import firebase from "firebase-admin";
// Or
const firebase = require("firebase-admin");

// Use it

const databaseURL = "<FIREBASE_DATABASE_URL>";
const credential = require("./firebase-key.json");
const { schema, count, keyReducers } = require("./schema");
await generateFirestoreData(
  {
    schema,
    count,
    keyReducers
  },
  {
    firebase,
    credential,
    databaseURL
  }
);
```

## CLI Usage

Requires 2 files to exist schema.js and credentials.js

`credentials.js`

```javascript
module.exports = {
  databaseURL: "<DATABASE_URL>",
  credential: {
    // JSON data from firebase-key.json
  }
};
```

```sh
  generate-firestore-data path/to/schema.js path/to/credentials.js
```
