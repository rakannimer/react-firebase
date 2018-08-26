import * as React from "react";
import { render } from "react-dom";
import firebase from "firebase/app";
import {
  FirebaseDatabaseProvider,
  FirebaseDatabaseNode
} from "@react-firebase/database";
import { config } from "../config";

const styles = {
  fontFamily: "sans-serif"
};

const s = (a: any) => JSON.stringify(a, null, 2);

export type AppState = {
  limit: number;
};

class App extends React.Component<any, AppState> {
  state = {
    limit: 2
  };
  render() {
    return (
      <div style={styles}>
        <FirebaseDatabaseProvider firebase={firebase} {...config}>
          <FirebaseDatabaseNode
            path="user_bookmarks/"
            limitToFirst={this.state.limit}
            orderByKey
            // orderByValue={"created_on"}
          >
            {d => {
              return (
                <React.Fragment>
                  <pre>Path {d.path}</pre>
                  <pre style={{ height: 300, overflow: "auto" }}>
                    Value {s(d.value)}
                  </pre>
                  <button
                    onClick={() => {
                      this.setState(state => ({ limit: state.limit + 2 }));
                    }}
                  >
                    Load more
                  </button>
                </React.Fragment>
              );
            }}
          </FirebaseDatabaseNode>
        </FirebaseDatabaseProvider>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
