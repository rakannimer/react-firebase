import * as React from "react";
import { FirestoreProviderState, FirestoreQuery } from "./types";

export const firestoreDefaultContext = {
  listenTo: ({  }: FirestoreQuery) => {},
  stopListeningTo: (path: string) => {},
  dataTree: {},
  firebase: null,
  firestore: null
} as FirestoreProviderState;

export const {
  Provider: FirestoreContextProvider,
  Consumer: FirestoreContextConsumer
} = React.createContext(firestoreDefaultContext);
