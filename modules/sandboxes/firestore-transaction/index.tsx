import * as React from "react";
import { render } from "react-dom";
import firebase from "firebase/app";
import {
  FirestoreProvider,
  FirestoreDocument,
  FirestoreTransaction
} from "@react-firebase/firestore";
import { config } from "./config";

const styles = {
  fontFamily: "sans-serif"
};

const s = (a: any) => JSON.stringify(a, null, 2);

const path = "user_bookmarks/test";

const App = () => (
  <div style={styles}>
    <FirestoreProvider firebase={firebase} {...config}>
      <FirestoreTransaction>
        {({ runTransaction }) => {
          return (
            <div>
              <button
                data-testid="test-set"
                onClick={async () => {
                  await runTransaction(async ({ get, update }) => {
                    const res = await get({
                      path
                    });
                    const data = res.data();
                    if (typeof data === "undefined") return;
                    await update(path, {
                      ...data,
                      a: isNaN(parseInt(data.a, 10)) ? 1 : data.a + 1
                    });
                  });
                }}
              >
                runTransaction
              </button>
            </div>
          );
        }}
      </FirestoreTransaction>
      <FirestoreDocument path={`${path}`}>
        {d => {
          return (
            <div>
              {d.value &&
                d.value.a && (
                  <div data-testid="test-value">
                    {JSON.stringify(d.value.a)}
                  </div>
                )}
              {d.path && <div data-testid="test-path">{d.path}</div>}
              <div data-testid="test-is-loading">{d.isLoading}</div>
            </div>
          );
        }}
      </FirestoreDocument>
    </FirestoreProvider>
  </div>
);

render(<App />, document.getElementById("root"));
