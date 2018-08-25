import * as React from "react";
import { State } from "react-powerplug";
import { FirestoreDocument, FirestoreMutation } from "../";
import { testCollectionPath, testDocValue, s } from "./App";
export const AddToCollection = () => (
  <div>
    <State initial={{ keys: [] as string[] }}>
      {({ setState, state }) => (
        <>
          <FirestoreMutation path={testCollectionPath} type="add">
            {({ runMutation }) => (
              <button
                data-testid="add-document"
                onClick={async () => {
                  const { key } = await runMutation(testDocValue);
                  if (key === null) return;
                  setState(state => ({
                    keys: [...state.keys, key]
                  }));
                }}
              >
                add-document-with-generated-key
              </button>
            )}
          </FirestoreMutation>
          {state.keys.map(key => (
            <React.Fragment key={key}>
              <FirestoreDocument path={`${testCollectionPath}/${key}`}>
                {({ value }) => <pre>{s(value)}</pre>}
              </FirestoreDocument>
              <FirestoreMutation
                path={`${testCollectionPath}/${key}`}
                type="delete"
              >
                {({ runMutation }) => (
                  <button
                    onClick={async () => {
                      await runMutation(testDocValue);
                      setState((state: any) => ({
                        ...state,
                        keys: [
                          ...state.keys.filter(
                            (currentKey: any) => currentKey !== key
                          )
                        ]
                      }));
                    }}
                  >
                    delete-generated-document
                  </button>
                )}
              </FirestoreMutation>
            </React.Fragment>
          ))}

          {state.keys.length > 0 && (
            <div data-testid="add-document-result">{s(state.keys)}</div>
          )}
        </>
      )}
    </State>
  </div>
);
