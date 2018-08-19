import { FirestoreProviderState, FirestoreNodeLoadingStatus } from "./types";
import {
  DocumentSnapshot,
  QuerySnapshot,
  CollectionReference
} from "@google-cloud/firestore";
import produce from "immer";
import set from "lodash.set";
import get from "lodash.get";

export type AddPathToDataArgs = {
  path: string;
  value: any;
  unsub: () => void;
  loadingStatus?: FirestoreNodeLoadingStatus;
  snapshot?: DocumentSnapshot | QuerySnapshot | CollectionReference;
};
export const actions = {
  addPathToData: (
    state: FirestoreProviderState,
    { path, value: newData, unsub, loadingStatus, snapshot }: AddPathToDataArgs
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
        loadingStatus
      });

      return newState;
    });
  },
  removePathFromData: (
    state: FirestoreProviderState,
    { path }: { path: string }
  ) => {
    const data = Object.assign({}, state.dataTree, {
      [path]: undefined
    });
    const newState = Object.assign({}, state, { dataTree: data });
    return newState;
  }
};
