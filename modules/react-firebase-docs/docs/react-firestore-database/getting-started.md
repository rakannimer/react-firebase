---
title: React Realtime Database
sidebar_label: Getting Started
---

- [Setup](#setup)
    - [Install](#install)
- [Usage](#usage)
  - [Components](#components)
  - [Firestore Provider](#firestore-provider)
  - [Firestore Collection Example](#firestore-collection-example)
  - [Firestore Document Example](#firestore-document-example)
  - [Firestore Mutation](#firestore-mutation)
  - [Upsert \(update or insert\) data to Firestore example](#upsert-update-or-insert-data-to-firestore-example)
  - [Batched Writes](#batched-writes)
  - [Sandboxes](#sandboxes)
      - [Infinite List](#infinite-list)
      - [Mutation](#mutation)
      - [Transaction](#transaction)

# Setup

### Install

If you haven't, install the [firebase](https://www.npmjs.com/package/firebase) JS client.

```bash
yarn add firebase
# Or 
npm i firebase
```

Install `@react-firebase/firestore`

```bash
yarn add @react-firebase/firestore # or npm i @react-firebase/auth
```



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

## Components

* FirestoreProvider
* FirestoreCollection
* FirestoreDocument
* FirestoreMutation
* FirestoreBatchedWrite

## Firestore Provider

Place a `FirestoreProvider` component at the top level of your app. 

```javascript
import { FirestoreProvider } from '@react-firebase/firestore'
// Before
const App = () => {
    return <div>
        This is my app
    </div>
}

// After
const App = () => {
    return (
        <FirestoreProvider {...config} firebase={firebase}>
            <div>
                This is my app
            </div>
        </FirestoreProvider>
    )
}
```

If you need to authenticate to access your data, check out [`@react-firebase/auth`](../react-firebase-auth/)\`\`

## Firestore Collection Example

```jsx
<FirestoreCollection path="/user_bookmarks/" limit={1}>
  {d => {
    return d.isLoading ? "Loading" : <pre>{d.value}</pre>;
  }}
</FirestoreCollection>
```

## Firestore Document Example

```jsx
<FirestoreDocument path="/user_bookmarks/G_K_1svqs">
  {d => {
    return d.isLoading ? "Loading" : <pre>{d.value}</pre>;
  }}
</FirestoreDocument>;
```

## Firestore Mutation

The `FirestoreMutation` allows you to render components that run Firebase mutations \(update, set, add\).

A `setMutation` function that returns a promise is provided to the children function.

FirebaseDatabaseMutation needs 3 props : 

* **path**: `string`
* **operation**: `"update" | "set" | "add"` 
* **children:** 

  | \(   {     runMutation: \(value:any, options?:any\) =&gt; Promise&lt;{key?:string}&gt;   } \) =&gt; ReactNode |
  | :--- |

## Upsert \(update or insert\) data to Firestore example

```jsx
<FirestoreMutation type="set" path="/user_bookmarks/G_K_5onxu">
  {({ runMutation }) => {
    return (
      <div>
        <h2> Mutate state </h2>
        <button
          onClick={() => {
            runMutation({
              nowOnCli: Date.now(),
              nowOnServer: firebase.firestore.FieldValue.serverTimestamp()
            }).then(res => {
              console.log("Ran mutation ", res);
            });
          }}
        >
          Mutate Set
        </button>
      </div>
    );
  }}
</FirestoreMutation>
```


## Batched Writes

Schedule a mutation with `addMutationToBatch`, and commit your changes with `commit`.

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
              path: `user_bookmarks/G_K_5onxu/`,
              value: { [`a-value-${Date.now()}`]: Date.now() },
              type: "update"
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
</FirestoreBatchedWrite>;

```

## Sandboxes


#### Infinite List

<iframe src="https://codesandbox.io/embed/github/rakannimer/react-firebase/tree/master/modules/sandboxes/firebase-database-infinite-list" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>


#### Mutation

<iframe src="https://codesandbox.io/embed/github/rakannimer/react-firebase/tree/master/modules/sandboxes/firebase-database-mutation" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

#### Transaction

<iframe src="https://codesandbox.io/embed/github/rakannimer/react-firebase/tree/master/modules/sandboxes/firebase-database-transaction" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

