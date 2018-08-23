---
sidebar_label: Generate Firebase Data
title: Generate Firebase Data
---

This module is meant to run on node NOT on the browser or react-native.  
Use this in your node server or on cli tools.

- [Setup](#setup)
    - [Installation](#installation)
      - [API](#api)
      - [CLI](#cli)
- [Usage](#usage)
    - [Programmatic Usage](#programmatic-usage)
    - [Cli Usage](#cli-usage)
      - [`credentials.js`](#credentialsjs)
      - [`schema.js`](#schemajs)

### Installation

#### API

```bash
  yarn add generate-firebase-data
  # If you don't already have firebase-admin as a dependency then add it too
  yarn add firebase-admin
```

#### CLI

```bash
  # In your project :
  yarn add -D generate-firestore-data
  yarn generate-firestore-data <schemaFilePath> <credentialsFilePath>

  # Or globally :
  npm i -g generate-firestore-data
  generate-firestore-data <schemaFilePath> <credentialsFilePath>
```

# Setup

1. First you need a Private Key from firebase for privileged environments, find out how to get it here: [`https://firebase.google.com/docs/admin/setup`](https://firebase.google.com/docs/admin/setup) \(or replace `YOUR_PROJECT_NAME_HERE` with your project name here : `https://console.firebase.google.com/project/YOUR_PROJECT_NAME_HERE/settings/serviceaccounts/adminsdk`
2. Place that private key `json` file somewhere in your project.
3. Take note of your databaseURL.
4. Create a schema for the data you want to generate.

### Installation

#### API

```bash
yarn add generate-firebase-data
```

#### CLI

```bash
# In your project :
yarn add -D generate-firebase-data
yarn generate-firebase-data <schemaFilePath> <credentialsFilePath>

# Or globally :
npm i -g generate-firebase-data
generate-firebase-data <schemaFilePath> <credentialsFilePath>
```




# Usage

### Programmatic Usage

```jsx
// Import it in your project

import { generateFirebaseData } from "generate-firebase-data";
// Or
const { generateFirebaseData } = require("generate-firebase-data");

// Import firebase-admin
import firebase from "firebase-admin";
// Or
const firebase = require("firebase-admin");

// Use it

(async () => {
  const databaseURL = "<FIREBASE_DATABASE_URL>";
  const credential = require("./firebase-key.json");
  const { schema, count, keyReducers } = require("./schema");
  await generateFirebaseData(
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
  // Done 👍 
})()

```

>

### Cli Usage

Requires 2 files to exist `schema.js` and `credentials.js`

#### `credentials.js`

```javascript
module.exports = {
  databaseURL: "<DATABASE_URL>",
  credential: {
  // JSON data from firebase-key.json
  // service account key downloaded from firebase
  }
};
```

#### `schema.js`

```javascript
const keyReducers = {
  "{env}": fakerjs => {
    return fakerjs.random.arrayElement(["staging"]);
    return fakerjs.random.arrayElement(["prod", "staging"]);
  },
  "{userID}": fakerjs => {
    return fakerjs.random.alphaNumeric(5);
  },
  "{postID}": fakerjs => {
    return fakerjs.random.alphaNumeric(5);
  }
};

const schema = {
  "{env}": {
    users: {
      "{userID}": {
        comment_count: "number",
        username: "string",
        is_verified: "boolean",
        created_at: "timestamp"
      }
    },
    posts: {
      "{postID}": {
        post_title: "string",
        post_data: (faker, key) => {
          // return faker.random.words(5)
          return key.split("/").join("-") + ":post_data";
        },
        // Can be async function !
        vote_counts: async (faker, key) => {
          const result = await doSomethingAsync()
          return result;
        },
        author_id: "{userID}",
        created_at: "timestamp"
      }
    },
    comments: {
      "{postID}": {
        "{commentID}": {
          value: "👍",
          userID: "{userID}"
        }
      }
    }
  }
};

const count = 5;

module.exports = {
  schema,
  keyReducers,
  count
};

```

