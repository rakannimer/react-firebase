import * as React from "react";
import * as firebase from "firebase/app";
import "firebase/firestore";
import { config } from "./test-credentials";
import { FirestoreProvider } from "../";
import { RenderInfiniteList } from "./RenderInfiniteList";
import { SetDocument } from "./SetDocument";
import { UpdateDocument } from "./UpdateDocument";
import { DeleteDocument } from "./DeleteDocument";
import { AddToCollection } from "./AddToCollection";
import { BatchedWrite } from "./BatchedWrite";

export const testCollectionPath = "user_bookmarks";
export const testDocPath = `${testCollectionPath}/TEST_USER_ID`;
export const testDocValue = {
  nowOnCli: Date.now(),
  nowOnServer: firebase.firestore.FieldValue.serverTimestamp(),
  some: "data"
};
export const testDocUpdate = {
  someOther: "data"
};

export const s = (v: any) => JSON.stringify(v, null, 2);

export const App = () => {
  return (
    <FirestoreProvider {...config} firebase={firebase}>
      <div style={{ display: "flex" }}>
        <SetDocument />
        <UpdateDocument />
        <DeleteDocument />
        <RenderInfiniteList />
        <AddToCollection />
        <BatchedWrite />
      </div>
    </FirestoreProvider>
  );
};
