- [React Firebase Firestore](#react-firebase-firestore)
    - [Usage](#usage)
    - [Example](#example)
  - [Reference](#reference)

# React Firebase Firestore

Easily render data from your firestore database in your react(-native) app.

React Firestore provides the following components :

- FirestoreProvider
- FirestoreCollection
- FirestoreDocument

### Usage

1. Change PROJECT_NAME to your project name and grab your firebase config here :
   https://console.firebase.google.com/project/PROJECT_NAME/settings/general/

```javascript
// Firebase Config
const config = {
  apiKey: "API_KEY",
  projectId: "PROJECT_ID",
  databaseURL: "DATABASE_URL",
  authDomain: "AUTH_DOMAIN",
  // OPTIONAL
  storageBucket: "STORAGE_BUCKET",
  messagingSenderId: "MESSAGING_SENDER_ID"
};
```

2. Place a `FirestoreProvider` Component anywhere in your component tree as an ancestor to any `FirestoreCollection` or `FirestoreDocument` and pass to it your firebase config.

### Example

```javascript
import firebase from "firebase/app";
import "firebase/firestore";
import {
  FirestoreProvider,
  FirestoreCollection,
  FirestoreDocument
} from "react-firebase-firestore";
import ReactJson from "react-json-view";

const config = {
  apiKey: credentials.apiKey,
  authDomain: credentials.authDomain,
  databaseURL: credentials.databaseURL,
  projectId: credentials.projectId,
  storageBucket: credentials.storageBucket,
  messagingSenderId: credentials.messagingSenderId
};

const App = () => {
  return (
    <FirestoreProvider {...config} firebase={firebase}>
      <div>oh hai</div>
      <FirestoreDocument path="/user_conversations/G_K_1svqs">
        {d => {
          return d.loadingStatus === "ready" ? (
            <ReactJson src={d} />
          ) : (
            "Loading"
          );
        }}
      </FirestoreDocument>
      <div>
        <h4>oh hai again</h4>
        <FirestoreCollection path="/user_conversations/" limit={1}>
          {d => {
            return d.loadingStatus === "ready" ? (
              <ReactJson src={d} />
            ) : (
              "Loading"
            );
          }}
        </FirestoreCollection>
      </div>
    </FirestoreProvider>
  );
};
```

## [Reference](https://firebase.google.com/docs/firestore/)
