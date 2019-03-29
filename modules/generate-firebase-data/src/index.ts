import { generateJson } from "generate-json";
import chunk from "lodash.chunk";
import { chunkAndParallelize } from "chunk-and-parallelize";
export type FirebaseCredential = {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url?: string;
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

export const generateFirebaseData = async (
  { schema, keyReducers, count }: GenerateJsonArgs,
  { databaseURL, credential, firebase }: InitializeAppArgs
) => {
  initializeApp({
    firebase,
    databaseURL,
    credential
  });
  const { project_id } = credential;
  const databaseBrowserURL = `https://console.firebase.google.com/project/${project_id}/database/${project_id}/data/`;
  console.log(
    `Adding Data to ${project_id}. You can watch here : ${databaseBrowserURL}`
  );
  const CHUNK_SIZE = 50;
  const { keys, values } = await generateJson({ schema, keyReducers, count });
  const paths = keys.map(key => key.split(".").join("/"));
  const chunkedPaths = chunk(paths, CHUNK_SIZE);
  const chunkedValues = chunk(values, CHUNK_SIZE);
  await chunkAndParallelize(chunkedValues.length, async i => {
    const currentChunkPath = chunkedPaths[i];
    const currentChunkVals = chunkedValues[i];
    const firebaseUpdate = currentChunkPath.reduce((acc: any, cur, i) => {
      acc[cur] = currentChunkVals[i];
      return acc;
    }, {});
    await firebase
      .app()
      .database()
      .ref()
      .update(firebaseUpdate);
  });

  console.log(
    `✅ Done. Check your data here https://console.firebase.google.com/project/${project_id}/database/${project_id}/data/`
  );
};
