import * as React from "react";
import * as firebase from "firebase/app";
import "firebase/database";
import { config } from "./test-credentials";
import { FirebaseDatabaseNode, FirebaseDatabaseProvider } from "../index";
import { FirebaseDatabaseMutation } from "../components/FirebaseDatabaseMutation";
import { FirebaseDatabaseTransaction } from "../components/FirebaseDatabaseTransaction";
import ReactJson from "react-json-view";

export const App = () => {
  return (
    <FirebaseDatabaseProvider {...config} firebase={firebase}>
      <div>hai</div>
      <FirebaseDatabaseNode path="user_bookmarks/" limitToFirst={1}>
        {d => {
          return <ReactJson src={d} />;
        }}
      </FirebaseDatabaseNode>
      <FirebaseDatabaseNode path="user_bookmarks/a">
        {d => {
          return <ReactJson src={d} />;
        }}
      </FirebaseDatabaseNode>
      <FirebaseDatabaseNode path="maximes/-L8m-aeCHQO7qtMVvUfMa">
        {d => {
          return d.isLoading === true ? "Loading" : <ReactJson src={d} />;
        }}
      </FirebaseDatabaseNode>
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
    </FirebaseDatabaseProvider>
  );
};
