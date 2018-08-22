# Usage

### Components

* FirestoreProvider
* FirestoreCollection
* FirestoreDocument
* FirestoreMutation

### Firestore Provider

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

### Firestore Collection Example

```jsx
<FirestoreCollection path="/user_bookmarks/" limit={1}>
  {d => {
    return d.isLoading ? "Loading" : <pre>{d.value}</pre>;
  }}
</FirestoreCollection>
```

### Firestore Document Example

```jsx
<FirestoreDocument path="/user_bookmarks/G_K_1svqs">
  {d => {
    return d.isLoading ? "Loading" : <pre>{d.value}</pre>;
  }}
</FirestoreDocument>;
```

### 

### Firestore Mutation

The `FirestoreMutation` allows you to render components that run Firebase mutations \(update, set, add\).

A `setMutation` function that returns a promise is provided to the children function.

FirebaseDatabaseMutation needs 3 props : 

* **path**: `string`
* **operation**: `"update" | "set" | "add"` 
* **children:** 

  | \(   {     runMutation: \(value:any, options?:any\) =&gt; Promise&lt;{key?:string}&gt;   } \) =&gt; ReactNode |
  | :--- |

### Upsert \(update or insert\) data to Firestore example

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

### 

### Complete Example

```jsx
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
      <FirestoreDocument path="/user_bookmarks/G_K_1svqs">
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
        <FirestoreCollection path="/user_bookmarks/" limit={1}>
          {d => {
            return d.isLoading ? (
              "Loading"
            ) : (
              <ReactJson src={d} />
            );
          }}
        </FirestoreCollection>
      </div>
    </FirestoreProvider>
  );
};
```

