import * as React from "react";
import { render } from "react-dom";
import firebase from "firebase/app";
import {
  FirebaseDatabaseProvider,
  FirebaseDatabaseNode,
  FirebaseDatabaseTransaction
} from "@react-firebase/database";
import { config } from "./config";

const styles = {
  fontFamily: "sans-serif"
};

const s = (a: any) => JSON.stringify(a, null, 2);

const path = "user_bookmarks/a/usage_count";

const App = () => (
  <div style={styles}>
    <FirebaseDatabaseProvider firebase={firebase} {...config}>
      <FirebaseDatabaseTransaction path={path}>
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

      <FirebaseDatabaseNode path={`${path}`}>
        {d => {
          return (
            <div>
              {d.value && (
                <pre data-testid="test-value">Value : {s(d.value)}</pre>
              )}
              {d.path && <pre data-testid="test-path">Path : {d.path}</pre>}
              <pre data-testid="test-is-loading">
                isLoading : {s(d.isLoading)}
              </pre>
            </div>
          );
        }}
      </FirebaseDatabaseNode>
    </FirebaseDatabaseProvider>
  </div>
);

render(<App />, document.getElementById("root"));
