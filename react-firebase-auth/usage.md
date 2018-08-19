# Usage

### Import firebase and firebase/auth

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

