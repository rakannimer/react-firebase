import * as React from "react";
import { render } from "react-dom";
import * as firebase from "firebase/app";
import "firebase/database";
import { config } from "./test-credentials";
import { FirebaseDatabaseNode, FirebaseDatabaseProvider } from "../index";
import { FirebaseDatabaseMutation } from "../components/FirebaseDatabaseMutation";
import ReactJson from "react-json-view";

const App = () => {
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
      <FirebaseDatabaseMutation
        type="set"
        path="user_bookmarks/a"
        value={{
          new_data: "Oh hai",
          updated_at: firebase.database.ServerValue.TIMESTAMP
        }}
      >
        {({ runMutation }) => {
          return (
            <div>
              <button
                onClick={() => {
                  runMutation().then(() => {
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
render(<App />, document.getElementById("root"));
