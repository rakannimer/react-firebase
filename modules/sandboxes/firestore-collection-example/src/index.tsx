import * as React from "react";
import { render } from "react-dom";

import firebase from "firebase/app";

import {
  FirestoreProvider,
  FirestoreCollection
} from "@react-firebase/firestore";
import { config } from "../config";

const styles = {
  fontFamily: "sans-serif"
};

const s = (a: any) => JSON.stringify(a, null, 2);

const App = () => {
  return (
    <div style={styles}>
      <FirestoreProvider {...config} firebase={firebase}>
        <div>
          <FirestoreCollection path="/user_bookmarks/" limit={5}>
            {d => {
              return <pre>{s(d)}</pre>;
            }}
          </FirestoreCollection>
        </div>
      </FirestoreProvider>
    </div>
  );
};

render(<App />, document.getElementById("root"));
