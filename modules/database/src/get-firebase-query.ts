import { FirebaseQuery } from "./types";

export const getFirebaseQuery = ({
  firebase = null,
  path = null,
  orderByChild = null,
  orderByKey = null,
  orderByValue = null,
  limitToFirst = null,
  limitToLast = null,
  startAt = null,
  endAt = null,
  equalTo = null
}: FirebaseQuery) => {
  if (firebase === null) {
    throw new Error("Need to supply firebase argument to getFirebaseQuery");
  }
  if (path === null) {
    throw new Error("Need to supply path argument to getFirebaseQuery");
  }
  let result = firebase.database().ref(path);
  if (orderByChild !== null) {
    result = result.orderByChild(orderByChild);
  }
  if (orderByKey !== null) {
    result = result.orderByKey();
  }
  if (orderByValue !== null) {
    result = result.orderByValue();
  }
  if (limitToFirst !== null) {
    result = result.limitToFirst(limitToFirst);
  }
  if (limitToLast !== null) {
    result = result.limitToLast(limitToLast);
  }
  if (startAt !== null) {
    result = result.startAt(startAt);
  }
  if (endAt !== null) {
    result = result.endAt(endAt);
  }
  if (equalTo !== null) {
    result = result.equalTo(equalTo);
  }
  return result;
};
