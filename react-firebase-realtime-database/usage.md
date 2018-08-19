# Usage

### Import firebase and firebase/database

```javascript
import firebase from "firebase/app";
import "firebase/database";
```



Place a `FirebaseDatabaseProvider` component at the top level of your app. 

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
      <FirebaseDatabaseNode path="maximes/" limitToFirst={2}>
        {d => {
          return d.loadingStatus === "ready" ? (
            <ReactJson src={d} />
          ) : (
            "Loading"
          );
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



