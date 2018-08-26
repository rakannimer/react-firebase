import * as React from "react";
import * as firebase from "firebase/app";
import "firebase/database";
import { State } from "react-powerplug";
import { config } from "./test-credentials";

import { FirebaseDatabaseNode, FirebaseDatabaseProvider } from "../index";
import { FirebaseDatabaseMutation } from "../components/FirebaseDatabaseMutation";
import { FirebaseDatabaseTransaction } from "../components/FirebaseDatabaseTransaction";
import ReactJson from "react-json-view";

export const FirebaseDatabaseList = () => (
  <div>
    <State initial={{ limit: 2 }}>
      {({ state, setState }) => (
        <FirebaseDatabaseNode
          path="user_bookmarks/"
          limitToFirst={state.limit}
          orderByValue={"created_on"}
        >
          {d => {
            return (
              <>
                <pre>Path {d.path}</pre>
                <pre style={{ height: 300, overflow: "auto" }}>
                  Value {JSON.stringify(d.value, null, 2)}
                </pre>
                <button
                  onClick={() => {
                    setState({ limit: state.limit + 1 });
                  }}
                >
                  Load more
                </button>
              </>
            );
          }}
        </FirebaseDatabaseNode>
      )}
    </State>
  </div>
);

export const FirebaseDatabaseItem = () => (
  <div>
    <FirebaseDatabaseNode path="user_bookmarks/a">
      {d => {
        return <ReactJson src={d} />;
      }}
    </FirebaseDatabaseNode>
  </div>
);

export const TransactionExample = () => (
  <FirebaseDatabaseTransaction path="user_bookmarks/a/usage_count">
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
);

export const MutationExample = () => (
  <div>
    <FirebaseDatabaseMutation type="set" path="user_bookmarks/a">
      {({ runMutation }) => {
        return (
          <div>
            <button
              onClick={() => {
                runMutation({
                  new_data: "Oh hai",
                  updated_at: firebase.database.ServerValue.TIMESTAMP,
                  now: Date.now()
                }).then(() => {
                  console.log("Ran mutation");
                });
              }}
            >
              Click me to run mutation
            </button>
          </div>
        );
      }}
    </FirebaseDatabaseMutation>
  </div>
);

export const App = () => {
  return (
    <FirebaseDatabaseProvider {...config} firebase={firebase}>
      <FirebaseDatabaseList />
      <FirebaseDatabaseItem />
      <TransactionExample />
      <MutationExample />
    </FirebaseDatabaseProvider>
  );
};
