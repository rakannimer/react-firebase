import { FirebaseDatabaseProviderState, FirebaseQuery } from "./types";
import produce from "immer";
import set from "lodash.set";

export type AddPathToDataArgs = {
  componentID: any;
  path: string;
  data: any;
  unsub: () => void;
  isLoading?: boolean;
  query: FirebaseQuery;
};

export type Operations = "add" | "delete";

export function stateReducer(
  state: FirebaseDatabaseProviderState,
  actionArgs: AddPathToDataArgs | { componentID: any; query: FirebaseQuery },
  operation: Operations
) {
  switch (operation) {
    case "add": {
      return actions.addPathToData(state, actionArgs as AddPathToDataArgs);
    }
    case "delete": {
      return actions.removePathFromData(state, actionArgs as AddPathToDataArgs);
    }
    default: {
      throw new Error(
        `Unsupported operation ${operation}. \n Supported state reducer operations are 'add' & 'delete'.`
      );
    }
  }
}

export const actions = {
  addPathToData: (
    state: FirebaseDatabaseProviderState,
    { path, data: newData, unsub, isLoading, componentID }: AddPathToDataArgs
  ) => {
    return produce(state as any, newState => {
      set(newState, `dataTree.${componentID}`, {
        path,
        value: newData,
        unsub,
        isLoading
      });
      return newState;
    });
  },
  removePathFromData: (
    state: FirebaseDatabaseProviderState,
    { query, componentID }: { query: FirebaseQuery; componentID: any }
  ) => {
    return produce(state as any, (newState: FirebaseDatabaseProviderState) => {
      set(newState, `dataTree.${componentID}`, undefined);
    });
  }
};
