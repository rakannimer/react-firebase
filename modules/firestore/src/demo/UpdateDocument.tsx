import * as React from "react";
import { FirestoreDocument, FirestoreMutation } from "../";
import { testDocPath, testDocUpdate, s } from "./App";
export const UpdateDocument = () => (
  <div>
    <FirestoreMutation type="update" path={testDocPath}>
      {({ runMutation }) => (
        <button
          data-testid="update-document"
          onClick={async () => {
            await runMutation(testDocUpdate);
          }}
        >
          update-document
        </button>
      )}
    </FirestoreMutation>
    <div>
      <FirestoreDocument path={testDocPath}>
        {d =>
          d.value && d.value.someOther ? (
            <pre data-testid="update-document-result">{s(d.value)}</pre>
          ) : null
        }
      </FirestoreDocument>
    </div>
  </div>
);
