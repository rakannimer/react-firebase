import * as React from "react";
import { render } from "react-dom";
import firebase from "firebase/app";
import {
  FirestoreProvider,
  FirestoreDocument,
  FirestoreBatchedWrite
} from "@react-firebase/firestore";
import { config } from "../config";

const styles = {
  fontFamily: "sans-serif"
};

const s = (a: any) => JSON.stringify(a, null, 2);

const path = "user_bookmarks/test";

const App = () => (
  <div style={styles}>
    <FirestoreProvider firebase={firebase} {...config}>
      <FirestoreBatchedWrite>
        {({ addMutationToBatch, commit }) => {
          return (
            <div>
              <h2>Batched write</h2>
              <button
                onClick={() => {
                  console.log("adding to batch");
                  addMutationToBatch({
                    path,
                    value: { [`a-value-${Date.now()}`]: Date.now() },
                    type: "set"
                  });
                }}
              >
                Add to batch
              </button>
              <button
                onClick={() => {
                  console.log("committing to batch");
                  commit().then(() => {
                    console.log("Committed");
                  });
                }}
              >
                Commit batch
              </button>
            </div>
          );
        }}
      </FirestoreBatchedWrite>
      <FirestoreDocument path={path}>
        {value => {
          return (
            <div>
              {<pre>{s(value)}</pre>}
              {value.path && <div data-testid="test-path">{value.path}</div>}
              <div data-testid="test-is-loading">{value.isLoading}</div>
            </div>
          );
        }}
      </FirestoreDocument>
    </FirestoreProvider>
  </div>
);

render(<App />, document.getElementById("root"));
