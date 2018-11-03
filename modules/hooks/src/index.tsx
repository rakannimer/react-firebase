//@ts-ignore
import React, { useState, useEffect, useContext, createContext } from "react";
import { initializeFirebaseApp } from "initialize-firebase-app";
import { getFirebaseRef } from "get-firebase-ref";
import sortBy from "lodash/sortby";
import keys from "lodash/keys";

import { FirebaseProviderProps, FirebaseQuery } from "./types";

export const FirebaseContext = createContext({ firebase: {} });

export function FirebaseProvider(props: FirebaseProviderProps) {
  const { children, firebase } = props;
  initializeFirebaseApp(props);
  return (
    <FirebaseContext.Provider value={{ firebase }}>
      {children}
    </FirebaseContext.Provider>
  );
}

export function useDatabase(firebaseQuery: FirebaseQuery) {
  const { firebase } = useContext(FirebaseContext);
  const [isLoading, setIsLoading] = useState(false) as [boolean, any];
  const [value, setValue] = useState(null) as [null | any, any];
  const [error, setError] = useState(null) as [null | any, any];
  const [firebaseRef, setFirebaseRef] = useState({});
  function onValue(v: any) {
    const {
      keysOnly,
      isList,
      orderByChild,
      orderByKey,
      orderByValue
    } = firebaseQuery;
    if (!v) return;
    if (v.val() === null) return;
    const value = v.val();
    if (!keysOnly && !isList) {
      setValue(value);
      return;
    }
    const unsortedKeys = keys(value);
    const sortedKeys = orderByChild
      ? (sortBy(
          unsortedKeys,
          key => value[key][orderByChild as string]
        ) as string[])
      : orderByKey
        ? (sortBy(unsortedKeys, key => key) as string[])
        : orderByValue
          ? (sortBy(unsortedKeys, key => value[key]) as string[])
          : unsortedKeys;
    if (keysOnly) {
      setValue(sortedKeys);
      return;
    }
    if (isList) {
      const val = sortedKeys.map((key: string) => ({ key, data: value[key] }));
      setValue(val);
      return;
    } else {
      setValue(value);
      return;
    }
  }
  useEffect(() => {
    const ref = getFirebaseRef({ ...firebaseQuery, firebase });
    setFirebaseRef(firebaseRef);
    setIsLoading(true);
    if (firebaseQuery.once) {
      const unsub = ref.on(
        "value",
        (v: any) => {
          setIsLoading(false);
          onValue(v);
        },
        (err: any) => {
          setError(err);
        }
      );
      return unsub;
    }
    ref.once("value", (v: any) => {
      setIsLoading(false);
      onValue(v);
    });
  });
  return { value, isLoading, ref: firebaseRef, error };
}
