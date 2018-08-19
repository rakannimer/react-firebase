import {
  Firestore,
  CollectionReference,
  DocumentReference,
  Query
} from "@google-cloud/firestore";

import { FirestoreQuery } from "./types";
const getFirestoreRefFromPath = ({ path, firestore }: any) => {
  let firestoreRef = firestore as
    | Firestore
    | CollectionReference
    | DocumentReference;
  const chunkedPath = path
    .split("/")
    .filter((el: string) => el && el.length > 0);
  for (let i = 0; i < chunkedPath.length; i += 1) {
    const currentChunk = chunkedPath[i];
    if (i % 2 === 0) {
      let currentRef = firestoreRef as Firestore | DocumentReference;
      firestoreRef = currentRef.collection(currentChunk);
    } else {
      let currentRef = firestoreRef as CollectionReference;
      firestoreRef = currentRef.doc(currentChunk);
    }
  }
  const leaf = firestoreRef as CollectionReference;
  return leaf;
};

export const getFirestoreQuery = ({
  firestore = null,
  path = null,
  where = null,
  orderBy = null,
  limit = null,
  startAt = null,
  endAt = null,
  startAfter = null,
  endBefore = null
}: FirestoreQuery) => {
  if (firestore === null) {
    throw new Error("Need to supply firestore argument to getFirestoreQuery");
  }
  if (path === null) {
    throw new Error("Need to supply path argument to getFirestoreQuery");
  }
  // console.log({ path });
  let ref: CollectionReference | Query = getFirestoreRefFromPath({
    path,
    firestore
  });
  if (where !== null) {
    ref = ref.where(where.field, where.operator, where.value);
  }
  if (orderBy !== null) {
    for (let currentOrderBy of orderBy) {
      const { field, type } = currentOrderBy;
      ref = ref.orderBy(field, type);
    }
  }
  if (startAt !== null) {
    const startAtArray = Array.isArray(startAt) ? startAt : [startAt];
    ref = ref.startAt(...startAtArray);
  }
  if (startAfter !== null) {
    ref = ref.startAfter(startAfter);
  }
  if (endBefore !== null) {
    ref = ref.endBefore(endBefore);
  }
  if (endAt !== null) {
    ref = ref.endAt(endAt);
  }
  if (limit !== null) {
    ref = ref.limit(limit);
  }
  return ref;
};
