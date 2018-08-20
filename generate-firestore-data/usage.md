---
description: Generating Mock Firestore Data
---

# Usage

### Programmatic Usage

```jsx
// Import it in your project

import { generateFirestoreData } from "generate-firestore-data";
// Or
const { generateFirestoreData } = require("generate-firestore-data");

// Import firebase-admin
import firebase from "firebase-admin";
// Or
const firebase = require("firebase-admin");

// Use it

(async () => {
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

