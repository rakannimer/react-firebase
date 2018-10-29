---
title: React Firebase Auth
sidebar_label: Getting Started
---

Easily integrate Firebase Authentication in your react(-native) app.

React Firebase Auth provides the following components :

- [Setup](#setup)
  - [Install](#install)
  - [Get your Firebase config](#get-your-firebase-config)
- [Usage](#usage)
  - [Import firebase and firebase/auth](#import-firebase-and-firebaseauth)
  - [Just show me some code](#just-show-me-some-code)
  - [Auth Example](#auth-example)

## Components

- `FirebaseAuthProvider`
- `FirebaseAuthConsumer`
- `IfFirebaseAuthed`
- `IfFirebaseAuthedAnd`
- `IfFirebaseUnAuthed`

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

Place a `FirebaseAuthProvider` component at the top level of your app. ( anywhere as long as it's above the other Auth components ).
Then use any of the other components anywhere in your component tree.

## Just show me some code

`FirebaseAuthProvider`

```jsx
<FirebaseAuthProvider firebase={firebase} {...config}>
  {
    // my app code
  }
</FirebaseAuthProvider>
```

`FirebaseAuthConsumer`

```jsx
<FirebaseAuthConsumer>
  {({ isSignedIn, user, providerId }) => {
    return (
      <pre style={{ height: 300, overflow: "auto" }}>
        {JSON.stringify({ isSignedIn, user, providerId }, null, 2)}
      </pre>
    );
  }}
</FirebaseAuthConsumer>
```

## Auth Example

<iframe src="https://codesandbox.io/embed/github/rakannimer/react-firebase/tree/master/modules/sandboxes/firebase-auth" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
