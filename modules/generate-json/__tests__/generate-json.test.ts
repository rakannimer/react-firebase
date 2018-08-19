import { generateJson } from "../src/";

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
  test("generateJson works with all arguments", async () => {
    faker.seed(SEED);
    const data = await generateJson({
      schema,
      keyReducers: keyReducer,
      count: 3
    });
    expect(data).toMatchSnapshot();
  });
  test("generateJson works without keyReducers", async () => {
    faker.seed(SEED);
    const data = await generateJson({ schema, count: 3 });
    expect(data).toMatchSnapshot();
  });

  test("generateJson works without keyReducers & without count", async () => {
    faker.seed(SEED);
    const data = await generateJson({ schema });
    expect(data).toMatchSnapshot();
  });
}
