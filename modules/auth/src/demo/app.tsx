import * as React from "react";
import { render } from "react-dom";
import * as firebase from "firebase/app";
import "firebase/auth";

import { config as testConfig } from "./test-credentials";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd
} from "..";

const config = {
  apiKey: testConfig.apiKey,
  authDomain: testConfig.authDomain,
  databaseURL: testConfig.databaseURL,
  projectId: testConfig.projectId,
  storageBucket: testConfig.storageBucket,
  messagingSenderId: testConfig.messagingSenderId
};

export const App = () => {
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
          data-testid="signin-anon"
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
