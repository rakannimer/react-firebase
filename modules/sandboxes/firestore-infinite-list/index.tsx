import * as React from "react";
import { render } from "react-dom";
import firebase from "firebase/app";
import {
  FirestoreCollection,
  FirestoreProvider
} from "@react-firebase/firestore";
import { config } from "./config";
const s = (a: any) => JSON.stringify(a, null, 2);

export type InfiniteListState = {
  page: number;
  pageLength: number;
};

export class InfiniteList extends React.Component<any, InfiniteListState> {
  state = {
    page: 0,
    pageLength: 1
  };
  render() {
    return (
      <FirestoreProvider {...config} firebase={firebase}>
        <div style={{ height: 300, width: 400, overflow: "auto" }}>
          <FirestoreCollection
            path={"user_bookmarks"}
            orderBy={[{ field: "nowOnCli", type: "desc" }]}
            limit={(this.state.page + 1) * this.state.pageLength}
          >
            {({ value }) => {
              return (
                <div>
                  <pre>{s(value)}</pre>
                </div>
              );
            }}
          </FirestoreCollection>
        </div>
        <button
          onClick={() => {
            this.setState(state => ({
              page: state.page + 1,
              pageLength: state.pageLength
            }));
          }}
        >
          Load More
        </button>
      </FirestoreProvider>
    );
  }
}

const App = InfiniteList;

render(<App />, document.getElementById("root"));
