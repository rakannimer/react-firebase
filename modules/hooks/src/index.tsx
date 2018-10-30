//@ts-ignore
import React, { useState, useEffect, useContext, createContext } from "react";
import { initializeFirebaseApp } from "initialize-firebase-app";
import { getFirebaseRef } from "get-firebase-ref";
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

export function useFirebaseRealtimeDatabase(firebaseQuery: FirebaseQuery) {
  const { firebase } = useContext(FirebaseContext);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(null);
  const [firebaseRef, setFirebaseRef] = useState({});
  useEffect(() => {
    const ref = getFirebaseRef({ ...firebaseQuery, firebase });
    setFirebaseRef(firebaseRef);
    setIsLoading(true);
    const unsub = ref.on("value", (v: any) => {
      setIsLoading(false);
      if (!v) return;
      setValue(v.val());
    });
    return unsub;
  });
  return { value, isLoading, ref: firebaseRef };
}
