import * as React from "react";
import { render } from "react-dom";
import * as firebase from "firebase/app";
import "firebase/firestore";

import { credentials } from "./test-credentials";
import { FirestoreProvider } from "../components/FirestoreProvider";
import { FirestoreDocument } from "../components/FirestoreDocument";
import { FirestoreCollection } from "../components/FirestoreCollection";
// import { FirebaseDatabaseNode, FirebaseDatabaseProvider } from "../index";

const config = {
  apiKey: credentials.apiKey,
  authDomain: credentials.authDomain,
  databaseURL: credentials.databaseURL,
  projectId: credentials.projectId,
  storageBucket: credentials.storageBucket,
  messagingSenderId: credentials.messagingSenderId
};
import ReactJson from "react-json-view";

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
        <FirestoreCollection path="/user_conversations/" limit={2}>
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
render(<App />, document.getElementById("root"));
