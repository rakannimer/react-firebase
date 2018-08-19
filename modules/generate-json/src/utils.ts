import admin from "firebase-admin";
import is from "is";
export const isPromise = (promiseMaybe: any) => {
  return (
    !!promiseMaybe &&
    (typeof promiseMaybe === "object" || typeof promiseMaybe === "function") &&
    typeof promiseMaybe.then === "function"
  );
};

export const getValueAt = async (path: string) => {
  const val = await admin
    .app()
    .database()
    .ref(path)
    .once("value");
  return val.val();
};

export const getType = (val: any) => {
  if (is.boolean(val)) {
    return "boolean";
  } else if (is.number(val)) {
    return "number";
  } else if (is.string(val)) {
    return "string";
  } else if (is.null(val)) {
    return "null";
  } else if (is.undefined(val)) {
    return "undefined";
  } else {
    // console.log(val);
    throw val;
  }
};
