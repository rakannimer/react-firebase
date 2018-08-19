export interface FirebaseQuery {
  firebase: any;
  path: string;
  orderByChild?: null | string;
  orderByKey?: null | any;
  orderByValue?: null | any;
  limitToFirst?: null | number;
  limitToLast?: null | number;
  startAt?: null | number;
  endAt?: null | number;
  equalTo?: null | any;
}

export interface InitializeAppArgs {
  authDomain: string;
  apiKey: string;
  databaseURL: string;
  firebase: any;
  projectId: string;
  messagingSenderId?: string;
  storageBucket?: string;
}

export type FirebaseDatabaseNodeLoadingStatus = "loading" | "ready" | "error";

export type FirebaseDatabaseNodeValue = {} | number | boolean | string | null;

export type FirebaseDatabaseProviderState = {
  firebase: any;
  dataTree: {
    [path: string]: {
      loadingStatus: FirebaseDatabaseNodeLoadingStatus;
      value: FirebaseDatabaseNodeValue;
      unsub: () => void;
    };
  };
  listenTo: (query: FirebaseQuery) => void;
  stopListeningTo: (path: string) => void;
};

export type FirebaseDatabaseContextConsumerLifeCycleProps = {} & FirebaseDatabaseProviderState &
  FirebaseQuery;

export type FirebaseDatabaseNodeValueContainer = {
  val: () => FirebaseDatabaseNodeValue;
};

export type FirebaseDatabaseProviderProps = InitializeAppArgs;
