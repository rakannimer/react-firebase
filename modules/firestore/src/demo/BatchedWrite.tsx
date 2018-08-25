import * as React from "react";
import { FirestoreBatchedWrite } from "../";
import { testDocPath } from "./App";
export const BatchedWrite = () => {
  return (
    <React.Fragment>
      <FirestoreBatchedWrite>
        {({ addMutationToBatch, commit }) => {
          // console.log()
          return (
            <div>
              <h2>Batched write</h2>
              <button
                onClick={() => {
                  console.log("adding to batch");
                  addMutationToBatch({
                    path: testDocPath,
                    value: { [`a-value-${Date.now()}`]: Date.now() },
                    type: "update"
                  });
                }}
              >
                Add to batch
              </button>
              <button
                onClick={() => {
                  console.log("committing to batch");
                  commit().then(() => {
                    console.log("Committed");
                  });
                }}
              >
                Commit batch
              </button>
            </div>
          );
        }}
      </FirestoreBatchedWrite>
    </React.Fragment>
  );
};
