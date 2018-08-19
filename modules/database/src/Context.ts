import * as React from "react";
import { FirebaseDatabaseProviderState, FirebaseQuery } from "./types";

export const firebaseDatabaseDefaultContext = {
  listenTo: ({  }: FirebaseQuery) => {},
  stopListeningTo: (path: string) => {},
  dataTree: {},
  firebase: null
} as FirebaseDatabaseProviderState;

export const {
  Provider: FirebaseDatabaseContextProvider,
  Consumer: FirebaseDatabaseContextConsumer
} = React.createContext(firebaseDatabaseDefaultContext);
