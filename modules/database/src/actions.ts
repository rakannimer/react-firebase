import {
  FirebaseDatabaseProviderState,
  FirebaseDatabaseNodeLoadingStatus
} from "./types";

export type AddPathToDataArgs = {
  path: string;
  data: any;
  unsub: () => void;
  loadingStatus?: FirebaseDatabaseNodeLoadingStatus;
};
export const actions = {
  addPathToData: (
    state: FirebaseDatabaseProviderState,
    { path, data: newData, unsub, loadingStatus }: AddPathToDataArgs
  ) => {
    const data = Object.assign({}, state.dataTree, {
      [path]: { data: newData, unsub, loadingStatus }
    });
    const newState = Object.assign({}, state, { dataTree: data });
    return newState;
  }
};
