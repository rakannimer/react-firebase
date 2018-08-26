---
title: React Realtime Database
sidebar_label: Getting Started
---

Easily Render Firebase Realtime Database in your react\(-native\) app.


- [Setup](#setup)
  - [Setup @react-firebase/database](#setup-react-firebasedatabase)
- [Usage](#usage)
  - [Components](#components)
  - [Firebase Database Node](#firebase-database-node)
  - [Read data from Firebase example](#read-data-from-firebase-example)
  - [Firebase Database Mutation](#firebase-database-mutation)
  - [Write data to Firebase example](#write-data-to-firebase-example)
  - [Firebase Database Transaction](#firebase-database-transaction)
  - [Firebase Transaction Example](#firebase-transaction-example)
  - [Complete Example](#complete-example)

# Setup

## Setup @react-firebase/database 

If you haven't, install the [firebase](https://www.npmjs.com/package/firebase) JS client.

```bash
yarn add firebase
# Or 
npm i firebase
```

Install `@react-firebase/database`

```bash
yarn add @react-firebase/database # or npm i @react-firebase/database
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

* FirebaseDatabaseProvider
* FirebaseDatabaseNode
* FirebaseDatabaseMutation
* FirebaseDatabaseTransaction

Place a `FirebaseDatabaseProvider` component at the top level of your app \(anywhere as long as it's above the other Realtime Database components\). 

```javascript
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
        <FirebaseDatabaseProvider>
            <div>
                This is my app
            </div>
        </FirebaseDatabaseProvider>
    )
}
```

If you need to authenticate to access your data, check out `@react-firebase/auth`

## Firebase Database Node

Check [API](api.md) for a list of supported props.

## Read data from Firebase example

<iframe src="https://codesandbox.io/embed/3vkm9l312p" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Firebase Database Mutation

The `FirebaseDatabaseMutation` allows you to render components that run Firebase mutations \(update, set, push\).

A `setMutation` function that returns a promise is provided to the children function.

FirebaseDatabaseMutation needs 3 props : 

* **path**: `string`
* **operation**: `"update" | "set" | "push"` 
* **children:** 

  | \(   {     runMutation: \(value:any\) =&gt; Promise&lt;{key?:string}&gt;   } \) =&gt; ReactNode |
  | :--- |

## Write data to Firebase example

<iframe src="https://codesandbox.io/embed/5v2w2n5r9p" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Firebase Database Transaction

Suppose you have a shared counter that many can increment. To avoid race conditions, use transactions.

FirebaseDatabaseTransaction needs 2 props: 

* **path**: `string`
* **children:** 

  | \(   {     runTransaction: \({ reducer: \(value:any\)=&gt;any }\) =&gt; Promise&lt;{key?:string}&gt;   } \) =&gt; ReactNode |
  | :--- |

## Firebase Transaction Example

<iframe src="https://codesandbox.io/embed/lyz4ow9r09" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
 

## Complete Example

<iframe src="https://codesandbox.io/embed/6l8j4yk2xn" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>








