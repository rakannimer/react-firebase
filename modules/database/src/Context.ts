import * as React from "react";
import { FirebaseDatabaseProviderState, FirebaseQuery } from "./types";
import memoize from "lodash.memoize";
export const firebaseDatabaseDefaultContext = {
  registerNode: ({ path }: FirebaseQuery) => {},
  removeNode: (path: string) => {},
  dataTree: {},
  firebase: {}
} as FirebaseDatabaseProviderState;

export type GetContext = (
  createContext?: any
) => {
  FirebaseDatabaseContextProvider: React.Provider<
    FirebaseDatabaseProviderState
  >;
  FirebaseDatabaseContextConsumer: React.Consumer<
    FirebaseDatabaseProviderState
  >;
};

export const getContext: GetContext = memoize(
  (
    createContext = (defaultContext: typeof firebaseDatabaseDefaultContext) =>
      React.createContext(defaultContext)
  ) => {
    const {
      Provider: FirebaseDatabaseContextProvider,
      Consumer: FirebaseDatabaseContextConsumer
    } = createContext(firebaseDatabaseDefaultContext);
    return {
      FirebaseDatabaseContextProvider,
      FirebaseDatabaseContextConsumer
    };
  },
  () => 1
);
