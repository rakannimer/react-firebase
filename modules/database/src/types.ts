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
  isList?: boolean;
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
};

export type OrNull<T> = T | null;
export type FirebaseDatabaseNodeChildFunctionProps = {
  value: any;
  path: string;
  isLoading: boolean;
};

type Renderable<T> =
  | React.Component<T>
  | React.StatelessComponent<T>
  | React.ReactChild;

export type FirebaseDatabaseNodeProps = {
  firebase?: any;
  path: string;
  orderByChild?: string;
  orderByKey?: any;
  orderByValue?: any;
  limitToFirst?: number;
  limitToLast?: number;
  startAt?: number;
  endAt?: number;
  equalTo?: any;
  keysOnly?: boolean;
  once?: boolean;
  isList?: boolean;
  unsub?: Function;
  children?: Renderable<FirebaseDatabaseNodeChildFunctionProps>;
};

export type FirebaseDatabaseNodeState = {
  firebase: OrNull<any>;
  path: OrNull<string>;
  orderByChild: OrNull<string>;
  orderByKey: OrNull<any>;
  orderByValue: OrNull<any>;
  limitToFirst: OrNull<number>;
  limitToLast: OrNull<number>;
  startAt: OrNull<number>;
  endAt: OrNull<number>;
  equalTo: OrNull<any>;
  keysOnly: OrNull<boolean>;
  once: OrNull<boolean>;
  isList: OrNull<boolean>;
  unsub: OrNull<Function>;
  value: OrNull<any>;
  isLoading: OrNull<boolean>;
};

export type FirebaseDatabaseContextConsumerLifeCycleProps = {} & FirebaseDatabaseProviderState &
  FirebaseQuery;

export type FirebaseDatabaseNodeValueContainer = {
  val: () => FirebaseDatabaseNodeValue;
};

export type FirebaseDatabaseProviderProps = InitializeAppArgs;
