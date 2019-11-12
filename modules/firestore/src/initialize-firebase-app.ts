import { InitializeAppArgs } from "./types";
export const initializeFirebaseApp = ({
  firebase,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  apiKey,
  appId,
  measurementId
}: InitializeAppArgs) => {
  try {
    firebase.initializeApp({
      apiKey,
      authDomain,
      databaseURL,
      projectId,
      storageBucket,
      messagingSenderId,
      appId,
      measurementId
    });
  } catch (err) {
    if (err.code !== "app/duplicate-app") {
      throw err;
    }
  }
};
