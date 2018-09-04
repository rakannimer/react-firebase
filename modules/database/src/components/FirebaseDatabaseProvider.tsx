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
import { getInternalDataPath } from "../utils";

const isObject = (value: any) => typeof value === "object" && value !== null;
export class FirebaseDatabaseProvider extends React.Component<
  FirebaseDatabaseProviderProps,
  FirebaseDatabaseProviderState
> {
  __isMounted = true;
  onValue = (
    d: FirebaseDatabaseNodeValueContainer,
    {
      unsub,
      componentID,
      query
    }: {
      unsub: Function;
      componentID: any;
      query: FirebaseQuery;
    }
  ) => {
    if (d === null || typeof d === "undefined") return;
    let data = d.val();
    if (query.keysOnly === true) {
      data = isObject(data) ? Object.keys(data as any) : [];
    }
    const { path } = query;
    this.setStateIfMounted(state =>
      stateReducer(
        state,
        {
          componentID,
          path,
          data,
          unsub,
          isLoading: false,
          query
        },
        "add"
      )
    );
  };
  registerNode = memoize(
    (componentID: number, firebaseQuery: FirebaseQuery) => {
      const { path } = firebaseQuery;
      if (componentID in this.state.dataTree) {
        const unsub = get(
          this.state,
          `dataTree.${componentID}.unsub`,
          () => {}
        );
        unsub();
      } else {
        // Prepare state shape for next update
        this.setStateIfMounted(state =>
          stateReducer(
            state,
            {
              path,
              componentID,
              data: null,
              unsub: () => {},
              isLoading: true,
              query: firebaseQuery
            },
            "add"
          )
        );
      }
      const ref = getFirebaseQuery({
        ...firebaseQuery,
        firebase: this.state.firebase
      });
      if (firebaseQuery.once === true) {
        ref.once("value", (d: FirebaseDatabaseNodeValueContainer) => {
          this.onValue(d, {
            unsub: () => {},
            componentID,
            query: firebaseQuery
          });
        });
      }
      const unsub = ref.on("value", (d: FirebaseDatabaseNodeValueContainer) => {
        this.onValue(d, { unsub, componentID, query: firebaseQuery });
      });
    },
    (componentID: any, query: FirebaseQuery) =>
      getInternalDataPath(componentID, query)
  );
  removeNode(componentID: any, query: FirebaseQuery) {
    if (!(componentID in this.state.dataTree)) {
      return;
    }
    const { path } = query;
    const unsub = get(this.state, `dataTree.${componentID}.unsub`, () => {});
    unsub();
    this.setStateIfMounted(state =>
      stateReducer(
        state,
        {
          path,
          componentID,
          query,
          unsub: () => {},
          isLoading: false
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
      registerNode: this.registerNode.bind(this),
      removeNode: this.removeNode.bind(this)
    };
    if (this.props.apiKey) {
      initializeFirebaseApp(this.props);
    }
  }
  setStateIfMounted = (
    stateReducer: (
      state: FirebaseDatabaseProviderState
    ) => FirebaseDatabaseProviderState
  ) => {
    if (this.__isMounted === false) return;
    this.setState(stateReducer);
  };
  componentDidMount() {
    this.__isMounted = true;
  }
  componentWillUnmount() {
    this.__isMounted = false;
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
