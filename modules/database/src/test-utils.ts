import * as firebase from "firebase/app";
import "firebase/firestore";
import memoize from "lodash/memoize";
import * as React from "react";
import { config } from "./demo/test-credentials";
import { initializeFirebaseApp } from "./initialize-firebase-app";
import { getFirebaseQuery } from "./get-firebase-query";
import { DocumentReference } from "@google-cloud/firestore";
import { renderAndAddProps } from "render-and-add-props";

const testCollectionPath = "user_bookmarks";
const testDocPath = `${testCollectionPath}/TEST_USER_ID`;

export const initFirebase = () => {};
export const getFirebase = memoize(
  (conf = config) => {
    initializeFirebaseApp({ ...conf, firebase });
    return firebase;
  },
  () => 1
);

export const deleteValueAtPath = async (path: string) => {
  const firebase = getFirebase();
  const ref = getFirebaseQuery({ firebase, path });
  await ref.set(null);
  return path;
};
export const getValueAtPath = async (path: string) => {
  const firebase = getFirebase();
  const ref = getFirebaseQuery({ firebase, path });
  const val = await ref.once("value");
  return val && val.val();
};

export const setValueAtPath = async (path: string, value: any) => {
  const firebase = getFirebase();
  const ref = getFirebaseQuery({ firebase, path }) as DocumentReference;
  const val = await ref.set(value);
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

export const IfNotFalsy = ({
  condition,
  children
}: {
  condition: any;
  children: any;
}) => {
  return condition ? children : null;
};

export const s = (v: any) => JSON.stringify(v);

export const p = (v: any) => JSON.parse(v);

export const WithTestId = ({ id, children }: { id: string; children: any }) => {
  return React.cloneElement(children, { "data-testid": id });
};

export const isBoolean = (val: any) => {
  return val === true || val === false;
};

export const IfDefined = ({ value, children }: { value: any; children: any }) =>
  value ? renderAndAddProps(children, { value }) : null;
