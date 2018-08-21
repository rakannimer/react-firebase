import * as React from "react";
import { render } from "react-dom";
import * as firebase from "firebase/app";
import "firebase/firestore";

import { config } from "./test-credentials";
import { FirestoreProvider } from "../components/FirestoreProvider";
import { FirestoreDocument } from "../components/FirestoreDocument";
import { FirestoreCollection } from "../components/FirestoreCollection";
// import { FirebaseDatabaseNode, FirebaseDatabaseProvider } from "../index";

import ReactJson from "react-json-view";

const App = () => {
  return (
    <FirestoreProvider {...config} firebase={firebase}>
      <div>oh hai</div>
      <FirestoreDocument path="/user_bookmarks/someUserId">
        {d => {
          return d.isLoading ? "Loading" : <ReactJson src={d} />;
        }}
      </FirestoreDocument>
      <div>
        <h4>oh hai again</h4>
        <FirestoreCollection path="/user_conversations/" limit={2}>
          {d => {
            return d.isLoading ? "Loading" : <ReactJson src={d} />;
          }}
        </FirestoreCollection>
      </div>
    </FirestoreProvider>
  );
};
render(<App />, document.getElementById("root"));
