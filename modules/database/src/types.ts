export type GetChildrenIds = () => any;
export interface FirebaseQuery {
  firebase?: any;
  path: string;
  orderByChild?: null | string;
  orderByKey?: null | any;
  orderByValue?: null | any;
  limitToFirst?: null | number;
  limitToLast?: null | number;
  startAt?: null | number;
  endAt?: null | number;
  equalTo?: null | any;
  keysOnly?: boolean;
  once?: boolean;
}

export interface InitializeAppArgs {
  authDomain?: string;
  apiKey?: string;
  databaseURL?: string;
  firebase: any;
  projectId?: string;
  messagingSenderId?: string;
  storageBucket?: string;
  createContext?: () => any;
}

export type FirebaseDatabaseNodeValue = {} | number | boolean | string | null;

export type FirebaseDatabaseProviderState = {
  firebase: any;
  dataTree: {
    [path: string]: {
      isLoading: boolean;
      value: FirebaseDatabaseNodeValue;
      unsub: () => void;
    };
  };
  registerNode: (componentID: any, query: FirebaseQuery) => void;
  removeNode: (componentID: any, path: string) => void;
};

export type FirebaseDatabaseContextConsumerLifeCycleProps = {} & FirebaseDatabaseProviderState &
  FirebaseQuery;

export type FirebaseDatabaseNodeValueContainer = {
  val: () => FirebaseDatabaseNodeValue;
};

export type FirebaseDatabaseProviderProps = InitializeAppArgs;
