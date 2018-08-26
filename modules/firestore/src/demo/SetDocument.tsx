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
          d.value ? (
            <pre data-testid="set-document-result">{s(d.value)}</pre>
          ) : null
        }
      </FirestoreDocument>
    </div>
  </div>
);
