import { InitializeAppArgs } from "./types";

export const initializeFirebaseApp = ({
  firebase,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  apiKey
}: InitializeAppArgs) => {
  try {
    firebase.initializeApp({
      apiKey,
      authDomain,
      databaseURL,
      projectId,
      storageBucket,
      messagingSenderId
    });
  } catch (err) {
    if (err.code !== "app/duplicate-app") {
      throw err;
    }
  }
};
