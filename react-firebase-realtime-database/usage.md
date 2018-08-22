# Usage

### Components

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

### Firebase Database Node

Check [API](api.md) for a list of supported props.

### Read data from Firebase example

```jsx
<React.Fragment>
  <FirebaseDatabaseNode path="user_bookmarks/" limitToFirst={2}>
    {d => {
      return <pre>{JSON.stringify(d, null, 2)}</pre>;
    }}
  </FirebaseDatabaseNode>
  <FirebaseDatabaseNode path="maximes/-L8m-aeCHQO7qtMVvUfMa">
    {d => {
      return d.isLoading === true ? (
        "Loading"
      ) : (
        <pre>{JSON.stringify(d, null, 2)}</pre>
      );
    }}
  </FirebaseDatabaseNode>
</React.Fragment>
```

### Firebase Database Mutation

The `FirebaseDatabaseMutation` allows you to render components that run Firebase mutations \(update, set, push\).

A `setMutation` function that returns a promise is provided to the children function.

FirebaseDatabaseMutation needs 3 props : 

* **path**: `string`
* **operation**: `"update" | "set" | "push"` 
* **children:** 

  | \(   {     runMutation: \(value:any\) =&gt; Promise&lt;{key?:string}&gt;   } \) =&gt; ReactNode |
  | :--- |

### Write data to Firebase example

```jsx
<FirebaseDatabaseMutation
  type="update"
  path="user_bookmarks/a"
>
  {({ runMutation }) => {
    return (
      <div>
        <button
          onClick={() => {
            runMutation({
              new_data: `Oh hai again ${Date.now()}`,
              updated_at: firebase.database.ServerValue.TIMESTAMP
            }).then(() => {
              console.log("Ran mutation");
            });
          }}
        >
          Click me to run mutation
        </button>
      </div>
    );
  }}
</FirebaseDatabaseMutation>
```

### Firebase Database Transaction

Suppose you have a shared counter that many can increment. To avoid race conditions, use transactions.

FirebaseDatabaseTransaction needs 2 props: 

* **path**: `string`
* **children:** 

  | \(   {     runTransaction: \({ reducer: \(value:any\)=&gt;any }\) =&gt; Promise&lt;{key?:string}&gt;   } \) =&gt; ReactNode |
  | :--- |

### Firebase Transaction Example

```jsx
<FirebaseDatabaseTransaction path="user_bookmarks/a/usage_count">
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
          Click me to run transaction
        </button>
      </div>
    );
  }}
</FirebaseDatabaseTransaction>;

```

 

### Complete Example

```javascript
import firebase from "firebase/app";
import "firebase/database";
import {
  FirebaseDatabaseProvider,
  FirebaseDataNode
} from "react-firebase-database";
import ReactJson from "react-json-view";

const MyApp = () => {
  return (
    <FirebaseDatabaseProvider {...config} firebase={firebase}>
      <div>hai</div>
      <FirebaseDatabaseNode path="user_bookmarks/" limitToFirst={1}>
        {d => {
          return d.isLoading === true ? "Loading" : <ReactJson src={d} />;
        }}
      </FirebaseDatabaseNode>
      <FirebaseDatabaseNode path="user_bookmarks/a">
        {d => {
          return <ReactJson src={d} />;
        }}
      </FirebaseDatabaseNode>
      <FirebaseDatabaseMutation
        type="set"
        path="user_bookmarks/a"
        value={{
          new_data: "Oh hai",
          updated_at: firebase.database.ServerValue.TIMESTAMP
        }}
      >
        {({ runMutation }) => {
          return (
            <div>
              <button
                onClick={() => {
                  runMutation({
                    newData: `Hi ${Date.now()}`, 
                    updated_at: firebase.database.ServerValue.TIMESTAMP 
                  }).then(() => {
                    console.log("Ran mutation");
                  });
                }}
              >
                Click me to run mutation
              </button>
            </div>
          );
        }}
      </FirebaseDatabaseMutation>
      <FirebaseDatabaseTransaction path="user_bookmarks/a/usage_count">
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
                Click me to run transaction
              </button>
            </div>
          );
        }}
      </FirebaseDatabaseTransaction>
    </FirebaseDatabaseProvider>
  );
};
```







