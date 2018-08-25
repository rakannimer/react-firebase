import * as React from "react";
import { FirestoreDocument, FirestoreMutation } from "../";
import { testDocPath, testDocValue, s } from "./App";
export const SetDocument = () => (
  <div>
    <FirestoreMutation type="set" path={testDocPath}>
      {({ runMutation }) => {
        return (
          <button
            data-testid="set-document"
            onClick={async () => {
              await runMutation(testDocValue);
            }}
          >
            set-document
          </button>
        );
      }}
    </FirestoreMutation>

    <div>
      <FirestoreDocument path={testDocPath}>
        {d =>
          d.value && d.value[0] !== null ? (
            <pre data-testid="set-document-result">{s(d.value[0])}</pre>
          ) : null
        }
      </FirestoreDocument>
    </div>
  </div>
);
