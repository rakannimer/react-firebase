import * as React from "react";
import { FirestoreCollection } from "../components/FirestoreCollection";
import { testCollectionPath, s } from "./App";
export const RenderCollection = () => (
  <div style={{ height: 300, width: 300, overflow: "auto" }}>
    <FirestoreCollection path={testCollectionPath}>
      {({ value }) => {
        return <pre>{s(value)}</pre>;
      }}
    </FirestoreCollection>
  </div>
);
