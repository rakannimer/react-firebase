import firebase from "firebase-admin";
import { credentials } from "./test-credentials";
import { generateFirebaseData } from "./index";
{
  const main = async () => {
    await generateFirebaseData(
      {
        schema: {
          user_bookmarks: {
            "{userID}": {
              user_id: "{userID}",
              name: "string",
              created_on: "timestamp"
            }
          }
        },
        count: 5
      },
      {
        databaseURL: credentials.databaseURL,
        credential: credentials.credential,
        firebase
      }
    );
  };

  if (require.main === module) {
    (async () => {
      await main();
    })();
  }
}
