import * as React from "react";
import { render } from "react-dom";
import * as firebase from "firebase/app";
import "firebase/database";

import { config } from "./test-credentials";
import { FirebaseDatabaseNode, FirebaseDatabaseProvider } from "../index";

import ReactJson from "react-json-view";

const App = () => {
  return (
    <FirebaseDatabaseProvider {...config} firebase={firebase}>
      <div>hai</div>
      <FirebaseDatabaseNode path="maximes/" limitToFirst={1}>
        {d => {
          return d.isLoading === true ? "Loading" : <ReactJson src={d} />;
        }}
      </FirebaseDatabaseNode>
      <FirebaseDatabaseNode path="maximes/-L8m-aeCHQO7qtMVvUfM">
        {d => {
          return d.isLoading === true ? "Loading" : <ReactJson src={d} />;
        }}
      </FirebaseDatabaseNode>
      <FirebaseDatabaseNode path="maximes/-L8m-aeCHQO7qtMVvUfMa">
        {d => {
          return d.isLoading === true ? "Loading" : <ReactJson src={d} />;
        }}
      </FirebaseDatabaseNode>
    </FirebaseDatabaseProvider>
  );
};
render(<App />, document.getElementById("root"));
