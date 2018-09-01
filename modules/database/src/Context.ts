
import * as React from "react";
import { FirebaseDatabaseProviderState, FirebaseQuery } from "./types";
import memoize from 'lodash.memoize'
export const firebaseDatabaseDefaultContext = {
  listenTo: ({ path }: FirebaseQuery) => { },
  stopListeningTo: (path: string) => { },
  dataTree: {},
  firebase: {}
} as FirebaseDatabaseProviderState;

export const getContext = memoize((
  createContext = () => React.createContext(firebaseDatabaseDefaultContext)
) => {
  const {
    Provider: FirebaseDatabaseContextProvider,
    Consumer: FirebaseDatabaseContextConsumer
  } = createContext();
  return {
    FirebaseDatabaseContextProvider,
    FirebaseDatabaseContextConsumer
  }
}, () => 1)

