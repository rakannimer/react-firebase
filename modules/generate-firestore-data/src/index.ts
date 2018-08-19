import { generateJson } from "generate-json";
import {
  Firestore,
  CollectionReference,
  DocumentReference
} from "@google-cloud/firestore";
export type FirebaseCredential = {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  clienMimeType_x509_cert_url: string;
};

export type InitializeAppArgs = {
  firebase: any;
  databaseURL: string;
  credential: FirebaseCredential;
};
export type InitializeApp = (args: InitializeAppArgs) => void;

export const initializeApp: InitializeApp = ({
  firebase,
  databaseURL,
  credential
}) => {
  try {
    firebase.initializeApp({
      databaseURL,
      credential: firebase.credential.cert(credential as any)
    });
    return;
  } catch (err) {
    if (err.code === "app/duplicate-app") {
      return;
    }
    throw err;
  }
};
export type GenerateJsonArgs = {
  schema: any;
  keyReducers?: any;
  count?: number;
};

const getFirestoreRefFromDottedPath = ({ path, firestore }: any) => {
  let firestoreRef = firestore as
    | Firestore
    | CollectionReference
    | DocumentReference;
  const chunkedPath = path.split(".");
  const leafName = chunkedPath.pop() || "";
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
  const leaf = firestoreRef as DocumentReference;
  return { ref: leaf, leafName };
};

export const generateFirestoreData = async (
  { schema, keyReducers, count }: GenerateJsonArgs,
  { databaseURL, credential, firebase }: InitializeAppArgs
) => {
  initializeApp({
    firebase,
    databaseURL,
    credential
  });
  const { keys, values } = await generateJson({ schema, keyReducers, count });
  const firestore = new Firestore();
  const settings = { timestampsInSnapshots: true };
  firestore.settings(settings);
  const firestoreBatch = firestore.batch();
  for (let a = 0; a < keys.length; a += 1) {
    const key = keys[a];
    const { ref: leaf, leafName } = getFirestoreRefFromDottedPath({
      path: key,
      firestore
    });

    firestoreBatch.set(leaf, { [leafName]: values[a] }, { merge: true });
    if (a % FIRESTORE_BATCH_LIMIT === 0 && a > 0) {
      await firestoreBatch.commit();
    }
  }
  await firestoreBatch.commit();
};

const FIRESTORE_BATCH_LIMIT = 500;

const main = async () => {
  const firebase = require("firebase-admin");
  const { credential, databaseURL } = require("./test-credentials");
  const {
    schema,
    count,
    keyReducers
  } = require("../example-schemas/schema-one");
  await generateFirestoreData(
    { schema, count, keyReducers },
    { databaseURL, credential, firebase }
  );
};

if (require.main === module) {
  (async () => {
    await main();
  })();
}
