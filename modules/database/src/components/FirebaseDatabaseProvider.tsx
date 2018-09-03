import * as React from "react";
import { renderAndAddProps } from "render-and-add-props";
import get from "lodash.get";
import memoize from "lodash.memoize";
import { initializeFirebaseApp } from "../initialize-firebase-app";
import { getContext } from "../Context";
import { getFirebaseQuery } from "../get-firebase-query";
import { stateReducer } from "../state-reducer";
import {
  FirebaseQuery,
  FirebaseDatabaseProviderState,
  FirebaseDatabaseNodeValueContainer,
  FirebaseDatabaseProviderProps
} from "../types";

const firebaseQueryProperties = [
  "path",
  "orderByChild",
  "orderByKey",
  "orderByValue",
  "limitToFirst",
  "limitToLast",
  "startAt",
  "endAt",
  "equalTo"
];

export class FirebaseDatabaseProvider extends React.Component<
  FirebaseDatabaseProviderProps,
  FirebaseDatabaseProviderState
> {
  registerNode = memoize(
    (firebaseQuery: FirebaseQuery) => {
      const { path } = firebaseQuery;
      if (path in this.state.dataTree) {
        console.error(
          "Re-listening to an already registered node in FirebaseDatabaseProvider. Debug info : ",
          JSON.stringify({ path, value: this.state.dataTree[path] })
        );
        const unsub = get(this.state, `dataTree.${path}.unsub`, () => {});
        unsub();
      } else {
        // Prepare state shape for next update
        this.setState(state =>
          stateReducer(
            state,
            {
              path,
              data: null,
              unsub: () => {},
              isLoading: true
            },
            "add"
          )
        );
      }
      const ref = getFirebaseQuery(
        Object.assign({}, firebaseQuery, { firebase: this.state.firebase })
      );
      const unsub = ref.on("value", (d: FirebaseDatabaseNodeValueContainer) => {
        if (d === null || typeof d === "undefined") return;
        this.setState(state =>
          stateReducer(
            state,
            {
              path,
              data: d.val(),
              unsub,
              isLoading: false
            },
            "add"
          )
        );
      });
    },
    query => firebaseQueryProperties.map(prop => query[prop]).join("_")
  );
  removeNode(path: string) {
    if (!(path in this.state.dataTree)) {
      return;
    }
    const unsub = get(this.state, `dataTree.${path}.unsub`, () => {});
    unsub();
    this.setState(state =>
      stateReducer(
        state,
        {
          path
        },
        "delete"
      )
    );
  }
  constructor(props: FirebaseDatabaseProviderProps) {
    super(props);
    this.state = {
      firebase: props.firebase,
      dataTree: {},
      // listenTo: this.registerNode.bind(this),
      // stopListeningTo: this.removeNode.bind(this),
      registerNode: this.registerNode.bind(this),
      removeNode: this.removeNode.bind(this)
    };
    if (this.props.apiKey) {
      initializeFirebaseApp(this.props);
    }
  }
  componentWillUnmount() {
    const { dataTree } = this.state;
    Object.keys(dataTree).forEach(key => {
      const unsub = get(this.state, `dataTree.${key}.unsub`, () => {});
      unsub();
    });
  }
  render() {
    const { children, createContext } = this.props;
    const { FirebaseDatabaseContextProvider } = getContext(createContext);
    return (
      <FirebaseDatabaseContextProvider value={this.state}>
        {renderAndAddProps(children, {})}
      </FirebaseDatabaseContextProvider>
    );
  }
}
