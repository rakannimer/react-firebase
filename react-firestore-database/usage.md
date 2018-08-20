# Usage

### Import firebase and firebase/firestore

```javascript
import firebase from "firebase/app";
import "firebase/firestore";
```



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
        <FirestoreProvider>
            <div>
            This is my app
            </div>
        </FirestoreProvider>
    )
}
```



If you need to authenticate to access your data, check out [`@react-firebase/auth`](../react-firebase-auth/)\`\`

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

