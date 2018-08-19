export const initializeFirebaseApp = ({
  firebase,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  apiKey
}) => {
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
    console.warn(
      "App has already been initialized, make sure you're not rendering FirebaseAuthProvider twice. If this is intended, you can safely ignore."
    );
  }
};
