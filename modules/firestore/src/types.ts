import { DocumentSnapshot } from "@google-cloud/firestore";

export type OrNull<T> = T | null;

export type PrimitiveType = number | boolean | string;

export type FirestoreQuery = {
  firestore: any;
  path: OrNull<string>;
  where?: OrNull<{
    field: string;
    operator: "<" | "<=" | "==" | ">" | ">=" | "array-contains";
    value: any;
  }>;
  orderBy?: OrNull<{ field: string; type?: "desc" | "asc" }[]>;
  limit?: OrNull<number>;
  startAt?: OrNull<PrimitiveType | PrimitiveType[] | DocumentSnapshot>;
  endAt?: OrNull<PrimitiveType | DocumentSnapshot>;
  startAfter?: OrNull<PrimitiveType | DocumentSnapshot>;
  endBefore?: OrNull<PrimitiveType | DocumentSnapshot>;
};

export type FirestoreNodeLoadingStatus = "loading" | "ready" | "error";

export type FirestoreNodeValue = {} | number | boolean | string | null;

export type FirestoreProviderState = {
  firebase: any;
  firestore: any;
  dataTree: {
    [path: string]: {
      loadingStatus: FirestoreNodeLoadingStatus;
      value: FirestoreNodeValue[];
      unsub: () => void;
    };
  };
  listenTo: (
    query: FirestoreQuery,
    documentOrCollection: "document" | "collection"
  ) => void;
  stopListeningTo: (path: string) => void;
};

export type FirestoreContextConsumerWithLifeCycleProps = {} & FirestoreProviderState &
  FirestoreQuery;

export type FirestoreNodeValueContainer = {
  val: () => FirestoreNodeValue;
};

export interface InitializeAppArgs {
  authDomain: string;
  apiKey: string;
  databaseURL: string;
  firebase: any;
  projectId: string;
  messagingSenderId?: string;
  storageBucket?: string;
}

export type FirestoreProviderProps = InitializeAppArgs;
