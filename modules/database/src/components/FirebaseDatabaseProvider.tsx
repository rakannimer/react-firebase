import * as React from "react";
import { renderAndAddProps } from "render-and-add-props";

import { initializeFirebaseApp } from "../initialize-firebase-app";
import { FirebaseDatabaseContextProvider } from "../Context";
import { getFirebaseQuery } from "../get-firebase-query";
import { actions } from "../actions";

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
      return;
    }
    const ref = getFirebaseQuery(
      Object.assign({}, firebaseQuery, { firebase: this.state.firebase })
    );
    const unsub = ref.on("value", (d: FirebaseDatabaseNodeValueContainer) => {
      if (d === null || typeof d === "undefined") return;

      this.setState(state =>
        actions.addPathToData(state, {
          path,
          data: d.val(),
          unsub,
          loadingStatus: "ready"
        })
      );
    });
  };
  stopListeningTo(path: string) {
    if (!(path in this.state.dataTree)) {
      return;
    }
    this.state.dataTree[path].unsub();
  }
  constructor(props: FirebaseDatabaseProviderProps) {
    super(props);
    this.state = {
      firebase: props.firebase,
      dataTree: {},
      listenTo: this.listenTo.bind(this),
      stopListeningTo: this.stopListeningTo.bind(this)
    };
    initializeFirebaseApp(this.props);
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
