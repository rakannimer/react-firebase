import * as React from "react";
import { FirebaseDatabaseProviderState, FirebaseQuery } from "./types";

export const firebaseDatabaseDefaultContext = {
  listenTo: ({ path }: FirebaseQuery) => {},
  stopListeningTo: (path: string) => {},
  dataTree: {},
  firebase: {}
} as FirebaseDatabaseProviderState;

export const {
  Provider: FirebaseDatabaseContextProvider,
  Consumer: FirebaseDatabaseContextConsumer
} = React.createContext(firebaseDatabaseDefaultContext);
