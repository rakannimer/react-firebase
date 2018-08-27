import * as React from "react";
import { renderAndAddProps } from "render-and-add-props";
import { initializeFirebaseApp } from "../initialize-firebase-app";
import { FirebaseDatabaseContextProvider } from "../Context";
import { getFirebaseQuery } from "../get-firebase-query";
import { stateReducer } from "../state-reducer";
import {
  FirebaseQuery,
  FirebaseDatabaseProviderState,
  FirebaseDatabaseNodeValueContainer,
  FirebaseDatabaseProviderProps
} from "../types";

export class FirebaseDatabaseProvider extends React.Component<
  FirebaseDatabaseProviderProps,
  FirebaseDatabaseProviderState
> {
  listenTo = async (firebaseQuery: FirebaseQuery) => {
    const { path } = firebaseQuery;

    if (path in this.state.dataTree) {
      this.state.dataTree[path].unsub && this.state.dataTree[path].unsub();
      // return;
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
  };
  stopListeningTo(path: string) {
    if (!(path in this.state.dataTree)) {
      return;
    }
    this.state.dataTree[path].unsub();
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
      listenTo: this.listenTo.bind(this),
      stopListeningTo: this.stopListeningTo.bind(this)
    };
    if (this.props.apiKey) {
      initializeFirebaseApp(this.props);
    }
  }
  componentWillUnmount() {
    const { dataTree } = this.state;
    Object.keys(dataTree).forEach(
      key => dataTree[key].unsub && dataTree[key].unsub()
    );
  }
  render() {
    const { children } = this.props;
    return (
      <FirebaseDatabaseContextProvider value={this.state}>
        {renderAndAddProps(children, {})}
      </FirebaseDatabaseContextProvider>
    );
  }
}
