import * as React from "react";
import { render } from "react-dom";
import * as firebase from "firebase/app";
import "firebase/firestore";

import { config } from "./test-credentials";
import { FirestoreProvider } from "../components/FirestoreProvider";
import { FirestoreDocument } from "../components/FirestoreDocument";
import { FirestoreCollection } from "../components/FirestoreCollection";
import { FirestoreMutation } from "../components/FirestoreMutation";
// import { FirebaseDatabaseNode, FirebaseDatabaseProvider } from "../index";

import ReactJson from "react-json-view";

const App = () => {
  return (
    <FirestoreProvider {...config} firebase={firebase}>
      <div>oh hai</div>
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
      <FirestoreMutation type="add" path="/user_bookmarks/">
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
                Mutate Add
              </button>
            </div>
          );
        }}
      </FirestoreMutation>
      <FirestoreDocument path="/user_bookmarks/G_K_5onxu">
        {d => {
          return d.isLoading ? "Loading" : <ReactJson src={d} />;
        }}
      </FirestoreDocument>
      <div>
        <h4>oh hai again</h4>
        <FirestoreCollection path="/user_bookmarks/" limit={2}>
          {d => {
            return d.isLoading ? "Loading" : <ReactJson src={d} />;
          }}
        </FirestoreCollection>
      </div>
    </FirestoreProvider>
  );
};
render(<App />, document.getElementById("root"));
