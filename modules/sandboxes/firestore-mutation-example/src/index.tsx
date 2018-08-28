import * as React from "react";
import { render } from "react-dom";
import firebase from "firebase/app";
import "firebase/firestore";
import {
  FirestoreProvider,
  FirestoreDocument,
  FirestoreMutation
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
      <FirestoreMutation type="set" path={path}>
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
      <FirestoreDocument path={path}>
        {value => {
          return (
            <div>
              {value.value && <pre>{s(value.value)}</pre>}
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
