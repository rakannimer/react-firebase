---
title: React Firebase Auth
sidebar_label: Getting Started
---

Easily integrate Firebase Authentication in your react\(-native\) app.

React Firebase Auth provides the following components :

- [Setup](#setup)
  - [Install](#install)
  - [Get your Firebase config](#get-your-firebase-config)
- [Usage](#usage)
  - [Import firebase and firebase/auth](#import-firebase-and-firebaseauth)

## Components

* `FirebaseAuthProvider` 
* `FirebaseAuthConsumer` 
* `IfFirebaseAuthed` 
* `IfFirebaseAuthedAnd` 
* `IfFirebaseUnAuthed`


# Setup

## Install

If you haven't, install the [firebase](https://www.npmjs.com/package/firebase) JS client.

```bash
yarn add firebase
# Or 
npm i firebase
```

Install `@react-firebase/auth`

```bash
yarn add @react-firebase/auth # or npm i @react-firebase/auth
```

## Get your Firebase config

Change `PROJECT_NAME` to your project name and grab your firebase config here : 

`https://console.firebase.google.com/project/PROJECT_NAME/settings/general/`

Your config file should look something like this : 

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


# Usage

## Import firebase and firebase/auth

```javascript
import firebase from "firebase/app";
import "firebase/auth";
```

Place a `FirebaseAuthProvider` component at the top level of your app. 

```jsx
import { FirebaseAuthProvider } from '@react-firebase/auth'
import { FirebaseDatabaseProvider } from '@react-firebase/database'
// Before
const App = () => {
    return <div>
        This is my app
    </div>
}

// After
const App = () => {
    return (
        <FirebaseAuthProvider {...config} firebase={firebase}>
            <div>
                Auth app
            </div>
            <FirebaseDatabaseProvider>
                <div>
                    This is my app
                </div>
            </FirebaseDatabaseProvider>
        </FirebaseAuthProvider>
    )
}
```

Then use any of the other components anywhere in your component tree.

```jsx
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

