# React Firebase Auth

Easily integrate Firebase Authentication in your react(-native) app.

React Firebase Auth exports the following components :

- FirebaseAuthProvider
- FirebaseAuthConsumer
- IfFirebaseAuthed
- IfFirebaseAuthedAnd
- IfFirebaseUnAuthed

### Usage

Change PROJECT_NAME to your project name and grab your firebase config here :
https://console.firebase.google.com/project/PROJECT_NAME/settings/general/

```javascript
// Firebase Config
const config = {
  apiKey: "API_KEY",
  authDomain: "AUTH_DOMAIN",
  projectId: "PROJECT_ID",

  // OPTIONAL
  databaseURL: "DATABASE_URL",
  storageBucket: "STORAGE_BUCKET",
  messagingSenderId: "MESSAGING_SENDER_ID"
};
```

Place an AuthProvider Component anywhere in your component tree as an ancestor to any of the other react-firebase-auth-provider components and pass to it your firebase config.

```javascript
import firebase from "firebase/app";
import "firebase/auth";
import {
  FirebaseAuthProvider,
  IfFirebaseUnAuthed,
  IfFirebaseAuthed,
  FirebaseAuthConsumer,
  IfFirebaseAuthedAnd
} from "react-firebase-auth-provider";

const config = {
  apiKey: "API_KEY",
  authDomain: "AUTH_DOMAIN",
  projectId: "PROJECT_ID",

  // OPTIONAL
  databaseURL: "DATABASE_URL",
  storageBucket: "STORAGE_BUCKET",
  messagingSenderId: "MESSAGING_SENDER_ID"
};

const MyApp = () => {
  return (
    <FirebaseAuthProvider {...config} firebase={firebase}>
      <div>
        <button
          onClick={() => {
            const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(googleAuthProvider);
          }}
        >
          Sign In with Google
        </button>
        <button
          onClick={() => {
            firebase.auth().signInAnonymously();
          }}
        >
          Sign In Anonymously
        </button>
        <button
          onClick={() => {
            firebase.auth().signOut();
          }}
        >
          Sign Out
        </button>
        <FirebaseAuthConsumer>
          {({ isSignedIn, user, providerId }) => {
            return (
              <pre style={{ height: 300, overflow: "auto" }}>
                {JSON.stringify({ isSignedIn, user, providerId }, null, 2)}
              </pre>
            );
          }}
        </FirebaseAuthConsumer>
        <div>
          <IfFirebaseAuthed>
            {() => {
              return <div>You are authenticated</div>;
            }}
          </IfFirebaseAuthed>
          <IfFirebaseAuthedAnd
            filter={({ providerId }) => providerId !== "anonymous"}
          >
            {({ providerId }) => {
              return <div>You are authenticated with {providerId}</div>;
            }}
          </IfFirebaseAuthedAnd>
        </div>
      </div>
    </FirebaseAuthProvider>
  );
};
```

## [Reference](https://firebase.google.com/docs/auth/)
