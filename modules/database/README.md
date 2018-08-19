# Render Data from your Firebase Realtime Database

Easily Render Firebase Realtime Database in your react(-native) app.

React Firebase Database provides the following components :

- FirebaseDatabaseProvider
- FirebaseDataNode

### Install

```sh
  yarn add @react-firebase/database
  # or
  npm i @react-firebase/database
```

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

2. Place a `FirebaseDatabaseProvider` Component anywhere in your component tree as an ancestor to your `FirebaseDatabaseNode` pass to it your firebase config.

```javascript
import firebase from "firebase/app";
import "firebase/database";
import {
  FirebaseDatabaseProvider,
  FirebaseDataNode
} from "react-firebase-database";

const MyApp = () => {
  return (
    <FirebaseDatabaseProvider {...config} firebase={firebase}>
      <div>hai</div>
      <FirebaseDatabaseNode path="maximes/" limitToFirst={2}>
        {d => {
          return <pre>{JSON.stringify(d, null, 2)}</pre>;
        }}
      </FirebaseDatabaseNode>
      <FirebaseDatabaseNode path="maximes/-L8m-aeCHQO7qtMVvUfM">
        {d => {
          return <pre>{JSON.stringify(d, null, 2)}</pre>;
        }}
      </FirebaseDatabaseNode>
      <FirebaseDatabaseNode path="maximes/-L8m-aeCHQO7qtMVvUfMa">
        {d => {
          return <pre>{JSON.stringify(d, null, 2)}</pre>;
        }}
      </FirebaseDatabaseNode>
    </FirebaseDatabaseProvider>
  );
};
```

## [Reference](https://firebase.google.com/docs/database/)
