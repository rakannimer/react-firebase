// import { generateData } from "../dist/index.cjs";
import { generateData } from "../src/";

import faker from "faker";

const SEED = 42;

const keyReducers = [
  {
    "{env}": (fakerjs: typeof faker) => {
      return fakerjs.random.arrayElement(["prod", "staging"]);
    },
    "{userID}": (fakerjs: typeof faker) => {
      return fakerjs.random.alphaNumeric(5);
    },
    "{postID}": (fakerjs: typeof faker) => {
      return fakerjs.random.alphaNumeric(5);
    }
  }
];

const schemas = [
  {
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
  }
];

for (let i = 0; i < schemas.length; i += 1) {
  const schema = schemas[0];
  const keyReducer = keyReducers[i];
  test("generateData works without second argument", async () => {
    faker.seed(SEED);
    const data = await generateData(schema);
    expect(data).toMatchSnapshot();
  });

  test("generateData works with second argument", async () => {
    faker.seed(SEED);
    const data = await generateData(schema, keyReducer);
    // console.log(data);
    expect(data).toMatchSnapshot();
  });
}
