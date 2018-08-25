import { FirestoreProviderState } from "./types";
import {
  DocumentSnapshot,
  QuerySnapshot,
  CollectionReference
} from "@google-cloud/firestore";
import produce from "immer";
import set from "lodash.set";
import get from "lodash.get";

export type Operations = "add" | "delete";

export function stateReducer(
  state: FirestoreProviderState,
  addArgs: AddPathToDataArgs,
  operation: "add"
): any;
export function stateReducer(
  state: FirestoreProviderState,
  deleteArgs: { path: string },
  operation: "delete"
): any;
export function stateReducer(
  state: FirestoreProviderState,
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

export type AddPathToDataArgs = {
  path: string;
  value: any;
  unsub: () => void;
  isLoading?: boolean;
  snapshot?: DocumentSnapshot | QuerySnapshot | CollectionReference;
};
export const actions = {
  addPathToData: (
    state: FirestoreProviderState,
    { path, value: newData, unsub, isLoading, snapshot }: AddPathToDataArgs
  ) => {
    return produce(state as any, newState => {
      const snapshotID = get(snapshot, "id", null);
      set(newState, "__id", snapshotID);
      set(newData, "__id", snapshotID);
      const values = get(state, `dataTree.${path}.value`, []).filter(
        (el: any) => el && el.__id !== snapshotID
      );
      set(newState, `dataTree.${path}`, {
        value: [...values, newData],
        unsub,
        isLoading
      });

      return newState;
    });
  },
  removePathFromData: (
    state: FirestoreProviderState,
    { path }: { path: string }
  ) => {
    return produce(state as any, newState => {
      set(newState, `dataTree.${path}`, undefined);
      return newState;
    });
  }
};
