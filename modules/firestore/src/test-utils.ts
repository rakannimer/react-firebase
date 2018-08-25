import * as firebase from "firebase/app";
import "firebase/firestore";
import memoize from "lodash.memoize";
import { config } from "./demo/test-credentials";
import { initializeFirebaseApp } from "./initialize-firebase-app";
import { getFirestoreQuery } from "./get-firestore-query";
import { DocumentReference } from "@google-cloud/firestore";

const testCollectionPath = "user_bookmarks";
const testDocPath = `${testCollectionPath}/TEST_USER_ID`;

export const initFirebase = () => {};
export const getFirestore = memoize(
  (conf = config) => {
    initializeFirebaseApp({ ...conf, firebase });
    const firestore = firebase.firestore();
    const settings = { timestampsInSnapshots: true };
    firestore.settings(settings);
    return firestore;
  },
  () => 1
);

export const deleteValueAtPath = async (path: string) => {
  const firestore = getFirestore();
  const ref = getFirestoreQuery({ firestore, path }) as DocumentReference;
  await ref.delete();
  return path;
};
export const getValueAtPath = async (path: string) => {
  const firestore = getFirestore();
  const ref = getFirestoreQuery({ firestore, path }) as DocumentReference;
  const val = await ref.get();
  return val && val.data();
};

export const setValueAtPath = async (path: string, value: any) => {
  const firestore = getFirestore();
  const ref = getFirestoreQuery({ firestore, path }) as DocumentReference;
  const val = await ref.set(value, { merge: true });
  return val;
};

export const before = async (path = testDocPath) => {
  await deleteValueAtPath(path);
  const val = await getValueAtPath(path);
  // expect(val).toEqual(undefined);
  await setValueAtPath(path, { c: "d" });
};

export const after = async (path = testDocPath) => {
  await deleteValueAtPath(path);
};
