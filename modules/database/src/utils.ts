import { FirebaseQuery } from "./types";
const firebaseQueryProperties = [
  "path",
  "orderByChild",
  "orderByKey",
  "orderByValue",
  "limitToFirst",
  "limitToLast",
  "startAt",
  "endAt",
  "equalTo",
  "keysOnly"
] as Array<keyof FirebaseQuery>;

export const getInternalDataPath = (componentID: any, query: FirebaseQuery) => {
  return `${componentID}-${firebaseQueryProperties
    .map(prop => query[prop])
    .join("_")}`;
};

let id = 0;
export const createID = () => {
  return id++;
};

export const hasFirebaseQueryChanged = (
  previousQuery: FirebaseQuery,
  currentQuery: FirebaseQuery
) => {
  for (let propName of firebaseQueryProperties) {
    if (previousQuery[propName] !== currentQuery[propName]) {
      return true;
    }
  }
  return false;
};
