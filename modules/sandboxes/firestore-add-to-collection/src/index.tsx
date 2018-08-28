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

// const path = "user_bookmarks/test";
const collectionPath = "user_bookmarks";
const testDocValue = {
  nowOnCli: Date.now(),
  nowOnServer: firebase.firestore.FieldValue.serverTimestamp(),
  some: "data"
};
export type AddToCollectionState = {
  keys: string[];
};
export class AddToCollection extends React.Component<
  any,
  AddToCollectionState
> {
  state = {
    keys: []
  };
  render() {
    return (
      <div>
        <FirestoreProvider firebase={firebase} {...config}>
          <div>
            <FirestoreMutation path={collectionPath} type="add">
              {({ runMutation }) => (
                <button
                  data-testid="add-document"
                  onClick={async () => {
                    const { key } = await runMutation(testDocValue);
                    if (key === null) return;
                    this.setState(state => ({
                      keys: [...state.keys, key]
                    }));
                  }}
                >
                  add-document-with-generated-key
                </button>
              )}
            </FirestoreMutation>
            {this.state.keys.map(key => (
              <React.Fragment key={key}>
                <FirestoreDocument path={`${collectionPath}/${key}`}>
                  {({ value }) => <pre>{s(value)}</pre>}
                </FirestoreDocument>
                <FirestoreMutation
                  path={`${collectionPath}/${key}`}
                  type="delete"
                >
                  {({ runMutation }) => (
                    <button
                      onClick={async () => {
                        await runMutation(testDocValue);
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
                </FirestoreMutation>
              </React.Fragment>
            ))}
            {this.state.keys.length > 0 && (
              <div data-testid="add-document-result">{s(this.state.keys)}</div>
            )}
          </div>
        </FirestoreProvider>
      </div>
    );
  }
}

const App = AddToCollection;

render(<App />, document.getElementById("root"));
