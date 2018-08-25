import * as React from "react";
import { FirestoreDocument, FirestoreMutation } from "../";
import { testDocPath, testDocUpdate, s } from "./App";
export const DeleteDocument = () => (
  <div>
    <FirestoreMutation type="delete" path={testDocPath}>
      {({ runMutation }) => (
        <>
          <button
            data-testid="delete-document"
            onClick={async () => {
              await runMutation(testDocUpdate);
            }}
          >
            delete-document
          </button>
          <FirestoreDocument path={testDocPath}>
            {d =>
              d.value && d.value[0] === null ? (
                <pre data-testid="delete-document-result">{s(d.value[0])}</pre>
              ) : null
            }
          </FirestoreDocument>
        </>
      )}
    </FirestoreMutation>
  </div>
);
