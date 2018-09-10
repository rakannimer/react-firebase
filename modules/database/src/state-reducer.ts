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

export type Operations = "add" | "delete" | "add-to-list" | "remove-from-list";

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
    case "add-to-list": {
      return actions.addToList(state, actionArgs as AddPathToDataArgs);
    }
    case "remove-from-list": {
      return actions.removeItemFromList(state, actionArgs as AddPathToDataArgs);
    }
    default: {
      throw new Error(
        `Unsupported operation ${operation}. \n Supported state reducer operations are 'add' & 'delete'.`
      );
    }
  }
}
import get from "lodash.get";
export const actions = {
  removeItemFromList: (
    state: FirebaseDatabaseProviderState,
    { path, data, unsub, isLoading, componentID, query }: AddPathToDataArgs
  ) => {
    const list = get(state, `dataTree.${componentID}.value`, false) as
      | false
      | { key: string; value: any }[];
    const { key } = data;
    if (list === false) {
      return null;
    }
    return produce(state as any, newState => {
      const dataIndexInList = list.findIndex(el => el.key === key);
      if (dataIndexInList === -1) {
        return newState;
      }
      set(newState, `dataTree.${componentID}`, {
        value: list.filter(el => el.key !== key)
      });
    });
  },
  addToList: (
    state: FirebaseDatabaseProviderState,
    {
      path,
      data: newData,
      unsub,
      isLoading,
      componentID,
      query
    }: AddPathToDataArgs
  ) => {
    const { key, data } = newData;
    const list = get(state, `dataTree.${componentID}.value`, false);
    if (!list) {
      const formattedData = query.keysOnly ? key : { key, data };
      return actions.addPathToData(state, {
        path,
        data: [formattedData],
        unsub,
        isLoading,
        componentID,
        query
      });
    }
    return produce(state as any, newState => {
      const list = get(newState, `dataTree.${componentID}.value`, []) as {
        key: string;
        value: any;
      }[];
      const dataIndexInList = list.findIndex(el => el.key === key);
      if (dataIndexInList === -1) {
        const formattedData = query.keysOnly ? key : { key, data };
        list.push(formattedData);
        set(newState, `dataTree.${componentID}`, {
          value: list
        });
      } else {
        set(
          newState,
          `dataTree.${componentID}.value.${dataIndexInList}.data`,
          data
        );
      }
      return newState;
    });
  },
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
