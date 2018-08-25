import * as React from "react";
import { render } from "react-dom";
import * as firebase from "firebase/app";
import "firebase/firestore";
import { State } from "react-powerplug";
import { config } from "./test-credentials";
import { FirestoreProvider } from "../components/FirestoreProvider";
import { FirestoreDocument } from "../components/FirestoreDocument";
import { FirestoreMutation } from "../components/FirestoreMutation";

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
                d.value && d.value[0] !== null && d.value[0].someOther ? (
                  <pre data-testid="update-document-result">
                    {s(d.value[0])}
                  </pre>
                ) : null
              }
            </FirestoreDocument>
          </div>
        </div>
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
                      <pre data-testid="delete-document-result">
                        {s(d.value[0])}
                      </pre>
                    ) : null
                  }
                </FirestoreDocument>
              </>
            )}
          </FirestoreMutation>
        </div>
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
                          delete-generated-documents
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
      </div>
    </FirestoreProvider>
  );
};

// const BatchedWriteExamples = () => {
//   return (
//     <React.Fragment>
//       <FirestoreBatchedWrite>
//         {({ addMutationToBatch, commit }) => {
//           // console.log()
//           return (
//             <div>
//               <h2>Batched write</h2>
//               <button
//                 onClick={() => {
//                   console.log("adding to batch");
//                   addMutationToBatch({
//                     path: `user_bookmarks/G_K_5onxu/`,
//                     value: { [`a-value-${Date.now()}`]: Date.now() },
//                     type: "update"
//                   });
//                 }}
//               >
//                 Add to batch
//               </button>
//               <button
//                 onClick={() => {
//                   console.log("committing to batch");
//                   commit().then(() => {
//                     console.log("Committed");
//                   });
//                 }}
//               >
//                 Commit batch
//               </button>
//             </div>
//           );
//         }}
//       </FirestoreBatchedWrite>
//     </React.Fragment>
//   );
// };

// const TransactionExamples = () => {
//   return (
//     <React.Fragment>
//       <FirestoreTransaction>
//         {({ runTransaction }) => {
//           return (
//             <div>
//               <button
//                 onClick={() => {
//                   runTransaction(
//                     async ({ transaction, get, update, fDelete }) => {
//                       const PATH = "user_bookmarks/G_K_5onxu/";
//                       const res = await get({
//                         path: PATH
//                       });
//                       const data = res.data();
//                       update(PATH, {
//                         ...data,
//                         [`Hai-${Date.now()}`]: Date.now()
//                       });
//                       // fDelete(`${PATH}`);
//                     }
//                   );
//                 }}
//               >
//                 runTransaction
//               </button>
//             </div>
//           );
//         }}
//       </FirestoreTransaction>
//     </React.Fragment>
//   );
// };
