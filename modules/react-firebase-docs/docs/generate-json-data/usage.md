# Usage

### Generate data based on data shape.

```javascript
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
        }
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

const { generateJSON } = require("json-data-generator");

(async () => {
  const { keys, values, tree } = await generateJSON(schema);
  console.log({ keys, values, tree });
})()


// Will Output :
Object {
  "keys": Array [
    "G_K_dsy6q.users.G_K_sll5g.comment_count",
    "G_K_dsy6q.users.G_K_sll5g.username",
    "G_K_dsy6q.users.G_K_sll5g.is_verified",
    "G_K_dsy6q.users.G_K_sll5g.created_at",
    "G_K_dsy6q.posts.G_K_5pn02.post_title",
    "G_K_dsy6q.posts.G_K_5pn02.post_data",
    "G_K_dsy6q.posts.G_K_5pn02.author_id",
    "G_K_dsy6q.posts.G_K_5pn02.created_at",
    "G_K_dsy6q.comments.G_K_5pn02.G_K_6mami.value",
    "G_K_dsy6q.comments.G_K_5pn02.G_K_6mami.userID",
  ],
  "tree": Object {
    "G_K_dsy6q": Object {
      "comments": Object {
        "G_K_5pn02": Object {
          "G_K_6mami": Object {
            "userID": "G_K_sll5g",
            "value": "👍",
          },
        },
      },
      "posts": Object {
        "G_K_5pn02": Object {
          "author_id": "G_K_sll5g",
          "created_at": 24761311291,
          "post_data": "G_K_dsy6q.posts.G_K_5pn02.post_data:post_data",
          "post_title": "Coordinator Multi-channelled",
        },
      },
      "users": Object {
        "G_K_sll5g": Object {
          "comment_count": 29122,
          "created_at": 9213076313,
          "is_verified": false,
          "username": "Namibia enable",
        },
      },
    },
  },
  "values": Array [
    29122,
    "Namibia enable",
    false,
    9213076313,
    "Coordinator Multi-channelled",
    "G_K_dsy6q.posts.G_K_5pn02.post_data:post_data",
    "G_K_sll5g",
    24761311291,
    "👍",
    "G_K_sll5g",
  ],
}
```

### Generate data based on data shape and key reducers.

```javascript
const keyReducers = {
  "{env}": (fakerjs: typeof faker) => {
    return fakerjs.random.arrayElement(["prod", "staging"]);
  },
  "{userID}": (fakerjs: typeof faker) => {
    return fakerjs.random.alphaNumeric(5);
  },
  // Can also be async !
  "{postID}": async (fakerjs: typeof faker) => {
    return fakerjs.random.alphaNumeric(5);
  }
}

const { generateJSON } = require("json-data-generator");

(async () => {
  const { keys, values, tree } = await generateJSON(schema, keyReducers);
  console.log({ keys, values, tree });
})()


// Will Output :

Object {
  "keys": Array [
    "prod.users.sy6qs.comment_count",
    "prod.users.sy6qs.username",
    "prod.users.sy6qs.is_verified",
    "prod.users.sy6qs.created_at",
    "prod.posts.gvcl5.post_title",
    "prod.posts.gvcl5.post_data",
    "prod.posts.gvcl5.author_id",
    "prod.posts.gvcl5.created_at",
    "prod.comments.gvcl5.G_K_706z6.value",
    "prod.comments.gvcl5.G_K_706z6.userID",
  ],
  "tree": Object {
    "prod": Object {
      "comments": Object {
        "gvcl5": Object {
          "G_K_706z6": Object {
            "userID": "sy6qs",
            "value": "👍",
          },
        },
      },
      "posts": Object {
        "gvcl5": Object {
          "author_id": "sy6qs",
          "created_at": 14382625758,
          "post_data": "prod.posts.gvcl5.post_data:post_data",
          "post_title": "enable Gorgeous Frozen Pants",
        },
      },
      "users": Object {
        "sy6qs": Object {
          "comment_count": 52475,
          "created_at": 19295395373,
          "is_verified": true,
          "username": "Grocery Home",
        },
      },
    },
  },
  "values": Array [
    52475,
    "Grocery Home",
    true,
    19295395373,
    "enable Gorgeous Frozen Pants",
    "prod.posts.gvcl5.post_data:post_data",
    "sy6qs",
    14382625758,
    "👍",
    "sy6qs",
  ],
}
```

### Use the cli.

Create a js file that exports \`schema\`, \(and optionally \`keyReducers\` and \`count\`\)

```javascript
const keyReducers = {
  "{env}": fakerjs => {
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

