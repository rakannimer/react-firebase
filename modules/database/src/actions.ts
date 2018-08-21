import { FirebaseDatabaseProviderState } from "./types";

export type AddPathToDataArgs = {
  path: string;
  data: any;
  unsub: () => void;
  isLoading?: boolean;
};
export const actions = {
  addPathToData: (
    state: FirebaseDatabaseProviderState,
    { path, data: newData, unsub, isLoading }: AddPathToDataArgs
  ) => {
    console.table(state.dataTree);
    const data = Object.assign({}, state.dataTree, {
      [path]: { value: newData, unsub, isLoading }
    });
    const newState = Object.assign({}, state, { dataTree: data });
    return newState;
  }
};
