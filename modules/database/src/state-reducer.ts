import { FirebaseDatabaseProviderState } from "./types";
import produce from "immer";
import set from "lodash.set";

export type AddPathToDataArgs = {
  path: string;
  data: any;
  unsub: () => void;
  isLoading?: boolean;
};

export type Operations = "add" | "delete";

export function stateReducer(
  state: FirebaseDatabaseProviderState,
  addArgs: AddPathToDataArgs,
  operation: "add"
): any;
export function stateReducer(
  state: FirebaseDatabaseProviderState,
  deleteArgs: { path: string },
  operation: "delete"
): any;
export function stateReducer(
  state: FirebaseDatabaseProviderState,
  actionArgs: AddPathToDataArgs | { path: string },
  operation: Operations
) {
  switch (operation) {
    case "add": {
      return actions.addPathToData(state, actionArgs as AddPathToDataArgs);
    }
    case "delete": {
      return actions.removePathFromData(state, actionArgs as { path: string });
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
    { path, data: newData, unsub, isLoading }: AddPathToDataArgs
  ) => {
    return produce(state as any, newState => {
      set(newState, `dataTree.${path}`, {
        value: newData,
        unsub,
        isLoading
      });
      return newState;
    });
  },
  removePathFromData: (
    state: FirebaseDatabaseProviderState,
    { path }: { path: string }
  ) => {
    const data = Object.assign({}, state.dataTree, {
      [path]: undefined
    });
    const newState = Object.assign({}, state, { dataTree: data });
    return newState;
  }
};
