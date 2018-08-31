
import * as React from "react";
import { FirebaseDatabaseProviderState, FirebaseQuery } from "./types";
import {memoize} from 'lodash'
export const firebaseDatabaseDefaultContext = {
  listenTo: ({ path }) => { },
  stopListeningTo: (path) => { },
  dataTree: {},
  firebase: {}
};

export const getContext = memoize((
  getReactContexFunction = () => React.createContext(firebaseDatabaseDefaultContext)
) => {
  const {
    Provider: FirebaseDatabaseContextProvider,
    Consumer: FirebaseDatabaseContextConsumer
  } = getReactContexFunction();
  return {
    FirebaseDatabaseContextProvider,
    FirebaseDatabaseContextConsumer
  }
}, () => 1)

