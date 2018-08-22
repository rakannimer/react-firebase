import * as React from "react";
import * as firebase from "firebase";
import { FirestoreProviderState, FirestoreQuery } from "./types";

export const firestoreDefaultContext = {
  listenTo: (a: any) => {},
  stopListeningTo: (path: string) => {},
  dataTree: {},
  firebase,
  firestore: null as any
} as FirestoreProviderState;

export const {
  Provider: FirestoreContextProvider,
  Consumer: FirestoreContextConsumer
} = React.createContext(firestoreDefaultContext);
