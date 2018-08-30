---
title: Introducing React Firebase 🎉
description: Declarative React Components to make Firebase integration with React & React Native easy & seamless.
tags: react, react-firebase, firebase, realtime-database, firestore
author: Rakan Nimer
authorURL: http://twitter.com/rakannimer
---

A Composable, Component based React API over Firebase services.

## TLDR;

I just released [@react-firebase](https://react-firebase-js.com) to make integrating Firebase in your React App fast & easy 🎉.
If you use React & Firebase, go check it out !

## The problem

I ❤️ Firebase & I ❤️ React.

I use both extensively at work and in side-projects.

But getting them to work together on large codebases with many contributors, would lead to :

1. Un-necessary complexity ( Where is this component loading its data from 🤔 ? )
2. Subtle bugs with subscription management. 🐛
3. Zombie listeners sticking around when your UI doesn't need them. 🎃

## This solution

[`@react-firebase`](https://react-firebase-js.com) offers small, typed, well-tested composable components which allow easy integration of Firebase Auth, Realtime Database and/or Firestore in your React or React Native app.

## Overview

`@react-firebase/auth`, `@react-firebase/database`, `@react-firebase/firestore` export Provider and Consumer Components.

### Providers

The `Provider` components take in `firebase` and firebase config options props and should be rendered once in your app as an ancestor to your `Consumer` components.

<details>
 <summary>How do I get my Firebase config ?</summary>
  <details>
    <summary>Web or React Native with Expo</summary>

If you're using
<a href="https://www.npmjs.com/package/firebase" target="_blank">firebase</a>

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

  </details>
  <details>
    <summary>React Native Firebase</summary>

If you're using [react-native-firebase](https://rnfirebase.com) then you don't need to pass any other prop because the firebase app is initialized from the native side.

  </details>
</details>

### Provider Examples

```jsx
import * as firebase from "firebase/app";

import "firebase/auth";
import { FirebaseAuthProvider } from "@react-firebase/auth";

// And or
import { FirebaseDatabaseProvider } from "@react-firebase/database";
import "firebase/database";

// And or
import "firebase/firestore";
import { FirestoreProvider } from "@react-firebase/firestore";
```

```jsx
<FirebaseAuthProvider firebase={firebase} {...config}>
  <MyApp1 />
  <MyApp2 />
</FirebaseAuthProvider>
```

### Consumers

Every Module exports Consumer components that will consume and react (😅) to Firebase changes.

All Consumer Components expect their `children` prop to be any valid React Node or any sync function that returns any valid React Node. (library-specific examples below 👇)

#### Firebase Auth Consumers

##### `FirebaseAuthConsumer`

Anywhere inside your app component tree, add a FirebaseAuthConsumer to listen and update the ui when the user's auth status changes.

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

#### Firebase Auth Helpers Components

The following are tiny wrapper components over FirebaseAuthConsumer that do common things you might want in an app.

<details>
<summary><code>IfFirebaseAuthed</code></summary>
Example :

```jsx
<IfFirebaseAuthed>
  {() => {
    return <div>You are authenticated</div>;
  }}
</IfFirebaseAuthed>
```

Or

```jsx
<IfFirebaseAuthed>
  <AppWhenAuthed />
</IfFirebaseAuthed>
```

</details>
<details>
<summary><code>IfFirebaseUnAuthed</code></summary>

```jsx
<IfFirebaseUnAuthed>
  () => (
  <div>
    <p>You are not authenticated. This div will disappear when you login.</p>
  </div>
  )
</IfFirebaseUnAuthed>
```

Or

```jsx
<IfFirebaseUnAuthed>
  <AppWhenUnAuthed />
</IfFirebaseUnAuthed>
```

</details>

And sometimes you might want to add additional restrictions to some of your UI. For example, you want to show something only if the user is anonymously un-authenticated, or only if they have a certain email or provider.

For that you can use :

<details>
<summary><code>IfFirebaseAuthedAnd</code></summary>

```jsx
<IfFirebaseAuthedAnd filter={({ providerId }) => providerId !== "anonymous"}>
  {({ isSignedIn, user, providerId }) => {
    return (
      <div>
        <p>Hello {JSON.stringify(user)}</p>
        <p>You are authenticated with {providerId}</p>
      </div>
    );
  }}
</IfFirebaseAuthedAnd>
```

Or

```jsx
const AppWhenAuthedAndAnonymous = ({ isSignedIn, user, providerId }) => (
  <div>
    <p>Hello {JSON.stringify(user)}</p>
    <p>You are authenticated with {providerId}</p>
  </div>
);
```

Then in an ancestor's render method :

```jsx
<IfFirebaseAuthedAnd filter={({ providerId }) => providerId !== "anonymous"}>
  <AppWhenAuthedAndAnonymous />
</IfFirebaseAuthedAnd>
```

</details>

##### [API Reference](https://react-firebase-js.com/docs/react-firebase-auth/api)

#### Firebase Database Consumers

##### Read Data

###### `FirebaseDatabaseNode`

Anywhere inside your app component tree, add a `FirebaseDatabaseNode` to listen and update the ui when the data changes at the provided path.

```jsx
<FirebaseDatabaseNode path={"user_bookmarks/BOOKMARK_ID"}>
  {({ value, isLoading, firebase }) => {
    return (
      <pre style={{ height: 300, overflow: "auto" }}>
        {JSON.stringify({ value, isLoading }, null, 2)}
      </pre>
    );
  }}
</FirebaseDatabaseNode>
```

[All Props.](https://react-firebase-js.com/docs/react-firebase-realtime-database/api#firebasedatabasenode-props)

##### Write Data

###### `FirebaseDatabaseMutation` & `FirebaseDatabaseTransaction`

The mutation API is inspired by [apollo-graphql mutations](https://www.apollographql.com/docs/react/essentials/mutations.html).

The mutation components inject a `runMutation` or `runTransaction` prop, respectively to their children.

`FirebaseDatabaseMutation`, in addition to the `path` prop requires a mutation `type` prop that can be one of :

```typescript
"set" | "update" | "push";
```

<details>
<summary>FirebaseDatabaseMutation Example.</summary>

```jsx
<FirebaseDatabaseMutation path={collectionPath} type="push">
  {({ runMutation }) => (
    <button
      onClick={async () => {
        const { key } = await runMutation(testDocValue);
        if (key === null || typeof key === "undefined") return;
        this.setState(state => ({
          keys: [...state.keys, key]
        }));
      }}
    >
      add-node-with-generated-key
    </button>
  )}
</FirebaseDatabaseMutation>
```

</details>

<details>
<summary>FirebaseDatabaseTransaction Example.</summary>

```jsx
<FirebaseDatabaseTransaction path={path}>
  {({ runTransaction }) => {
    return (
      <div>
        <button
          onClick={() => {
            runTransaction({
              reducer: val => {
                if (val === null) {
                  return 1;
                } else {
                  return val + 1;
                }
              }
            }).then(() => {
              console.log("Ran transaction");
            });
          }}
        >
          Click me to run a transaction
        </button>
      </div>
    );
  }}
</FirebaseDatabaseTransaction>
```

</details>

- [FirebaseDatabaseMutation API](https://react-firebase-js.com/docs/react-firebase-realtime-database/api#firebasedatabasemutation-props)
- [FirebaseDatabaseTranasaction API](https://react-firebase-js.com/docs/react-firebase-realtime-database/api#firebasedatabasetransaction-props)

#### Firestore Database Consumers

##### Read Data with `FirestoreDocument` & `FirestoreCollection`

Anywhere inside your app component tree, add a `FirestoreDocument` or `FirestoreCollection` to listen to the data and update the ui when it changes.

<details>
<summary>
`FirestoreDocument` Example.
</summary>

```jsx
const s = v => JSON.stringify(v, null, 2);
const App = () => (
  <FirestoreDocument path={path}>
    {({ value, path, isLoading }) => {
      return (
        <div>
          {value && <pre>{s(value)}</pre>}
          {path && <div>{path}</div>}
          <div>{isLoading}</div>
        </div>
      );
    }}
  </FirestoreDocument>
);
```

</details>

###### [`FirestoreDocument` API](https://react-firebase-js.com/docs/react-firestore-database/api#firestoredocument)

<details>
<summary>
`FirestoreCollection` Example
</summary>

```jsx
<FirestoreCollection path="/user_bookmarks/" limit={5}>
  {d => {
    return <pre>{s(d)}</pre>;
  }}
</FirestoreCollection>
```

</details>

###### [`FirestoreCollection` API](https://react-firebase-js.com/docs/react-firestore-database/api#firestorecollection)

##### Write Data with `FirestoreMutation` & `FirestoreTransaction` & `FirestoreBatchedWrite`

The mutation API is inspired by [apollo-graphql mutations](https://www.apollographql.com/docs/react/essentials/mutations.html).

The mutation components `FirestoreMutation` & `FirestoreTransaction` inject a `runMutation` or `runTransaction` prop, respectively to their children.

`FirestoreMutation` in addition to the `path` prop requires a mutation `type` prop that can be one of :

```typescript
"set" | "update" | "add";
```

The `BatchedWrite` exposes a different API because it behaves differently than writes and transactions, because it can run many updates before `committing` them.

It injects 2 props, `addMutationToBatch` and `commit`, to its children.

- `addMutationToBatch`

```typescript
type addMutationToBatch = (
  {
    path,
    value,
    type
  }: {
    path: string;
    value: any;
    type: "add" | "update" | "set" | "delete";
  }
) => void;
```

- `commit`

```typescript
type commit = () => Promise<void>;
```

<details>
<summary>
`FirestoreMutation` Example
</summary>

```jsx
<FirestoreProvider firebase={firebase} {...config}>
  <FirestoreMutation type="set" path={path}>
    {({ runMutation }) => {
      return (
        <div>
          <h2> Mutate state </h2>
          <button
            onClick={async () => {
              const mutationResult = await runMutation({
                nowOnCli: Date.now(),
                nowOnServer: firebase.firestore.FieldValue.serverTimestamp()
              });
              console.log("Ran mutation ", mutationResult);
            }}
          >
            Mutate Set
          </button>
        </div>
      );
    }}
  </FirestoreMutation>
</FirestoreProvider>
```

</details>

<details>
<summary>
`FirestoreTranasaction` Example
</summary>

```jsx
<FirestoreProvider firebase={firebase} {...config}>
  <FirestoreTransaction>
    {({ runTransaction }) => {
      return (
        <div>
          <button
            data-testid="test-set"
            onClick={async () => {
              await runTransaction(async ({ get, update }) => {
                const res = await get({
                  path
                });
                const data = res.data();
                if (typeof data === "undefined") return;
                await update(path, {
                  ...data,
                  a: isNaN(parseInt(data.a, 10)) ? 1 : data.a + 1
                });
              });
            }}
          >
            runTransaction
          </button>
        </div>
      );
    }}
  </FirestoreTransaction>
</FirestoreProvider>
```

</details>

<details>
<summary>
`FirestoreBatchedWrite` Example
</summary>

```jsx
<FirestoreBatchedWrite>
  {({ addMutationToBatch, commit }) => {
    return (
      <div>
        <h2>Batched write</h2>
        <button
          onClick={() => {
            console.log("adding to batch");
            addMutationToBatch({
              path,
              value: { [`a-value-${Date.now()}`]: Date.now() },
              type: "set"
            });
          }}
        >
          Add to batch
        </button>
        <button
          onClick={() => {
            console.log("committing to batch");
            commit().then(() => {
              console.log("Committed");
            });
          }}
        >
          Commit batch
        </button>
      </div>
    );
  }}
</FirestoreBatchedWrite>
```

</details>

## Resources

### [Editable Sandboxes](https://react-firebase-js.com/docs/try-it-out)

### [Verbose Tutorial (WIP)](https://react-firebase-js.com/docs/guides/build-a-react-app-with-firebase-auth-and-realtime-database/setup-the-development-environment)

### [Bookmarking App Example](https://github.com/rakannimer/react-firebase/tree/master/modules/tutorial-bookmarking-app)

### [React Native with Expo and Firebase Example](https://github.com/rakannimer/react-firebase/tree/master/react-native-examples/react-native-expo-firebase-example)

### [React Native Firebase Starter Example](https://github.com/rakannimer/react-firebase/tree/master/react-native-examples/react-native-firebase-starter)

## Related Work

- [re-base](https://github.com/tylermcginnis/re-base)
- [redux-firebase](https://github.com/prescottprue/redux-firebase)
- [react-firestore](https://github.com/green-arrow/react-firestore)
- [Your Library ? Open a PR to add it here.](https://github.com/rakannimer/react-firebase/tree/master/modules/react-firebase-docs/website/blog)

## Acknowledgements

- [The React team.](https://twitter.com/reactjs)
- [The Firebase team for building and maintaining a great product !](https://twitter.com/firebase)
- [@mwestrate](https://twitter.com/mweststrate)'s for writing [immer](https://github.com/mweststrate/immer) (and [mobx](https://github.com/mobxjs/mobx/), not used in this project, but a great library nonetheless 😀).
- [The Docusaurus team (This website and blog are built with docusaurus).](https://twitter.com/docusaurus)

Thanks for making it to the end of the article ❤️ !

Here's a couple of additional resources just for you :

- [Generate Connected JSON Data](https://react-firebase-js.com/docs/generate-json-data)
- [Generate Firebase Database Data](https://react-firebase-js.com/docs/generate-firebase-data)
- [Generate Firestore Data](https://react-firebase-js.com/docs/generate-firebase-data)
