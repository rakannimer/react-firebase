import * as React from "react";
import { render } from "react-dom";
import firebase from "firebase/app";
import "firebase/database";
import {
  FirebaseDatabaseProvider,
  FirebaseDatabaseNode,
  FirebaseDatabaseMutation
} from "@react-firebase/database";
import { config } from "../config";

const styles = {
  fontFamily: "sans-serif"
};

const s = (a: any) => JSON.stringify(a, null, 2);

const collectionPath = "TEST_NAMESPACE/user_bookmarks/";
const testDocValue = {
  nowOnCli: Date.now(),
  nowOnServer: firebase.database.ServerValue.TIMESTAMP,
  some: "data"
};

export type AppState = {
  keys: string[];
};

class App extends React.Component<any, AppState> {
  state = {
    keys: []
  };
  render() {
    return (
      <div style={styles}>
        <FirebaseDatabaseProvider firebase={firebase} {...config}>
          <div>
            <FirebaseDatabaseMutation path={collectionPath} type="push">
              {({ runMutation }) => (
                <button
                  data-testid="add-document"
                  onClick={async () => {
                    const { key } = await runMutation(testDocValue);
                    if (key === null || typeof key === "undefined") return;
                    this.setState(state => ({
                      keys: [...state.keys, key]
                    }));
                  }}
                >
                  add-document-with-generated-key
                </button>
              )}
            </FirebaseDatabaseMutation>
            {this.state.keys.map(key => (
              <React.Fragment key={key}>
                <FirebaseDatabaseNode path={`${collectionPath}/${key}`}>
                  {({ value }) => <pre>{s(value)}</pre>}
                </FirebaseDatabaseNode>
                <FirebaseDatabaseMutation
                  path={`${collectionPath}/${key}`}
                  type="set"
                >
                  {({ runMutation }) => (
                    <button
                      onClick={async () => {
                        await runMutation(null);
                        this.setState((state: any) => ({
                          ...state,
                          keys: [
                            ...state.keys.filter(
                              (currentKey: any) => currentKey !== key
                            )
                          ]
                        }));
                      }}
                    >
                      delete-generated-document
                    </button>
                  )}
                </FirebaseDatabaseMutation>
              </React.Fragment>
            ))}
            {this.state.keys.length > 0 && (
              <div data-testid="add-document-result">{s(this.state.keys)}</div>
            )}
          </div>
        </FirebaseDatabaseProvider>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
