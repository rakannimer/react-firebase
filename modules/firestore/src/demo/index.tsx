import * as React from "react";
import { render } from "react-dom";
import * as firebase from "firebase/app";
import "firebase/firestore";

import { config } from "./test-credentials";
import { FirestoreProvider } from "../components/FirestoreProvider";
import { FirestoreDocument } from "../components/FirestoreDocument";
import { FirestoreCollection } from "../components/FirestoreCollection";
import { FirestoreMutation } from "../components/FirestoreMutation";
import { FirestoreBatchedWrite } from "../components/FirestoreBatchedWrite";
import { FirestoreTransaction } from "../components/FirestoreTransaction";

// import { FirebaseDatabaseNode, FirebaseDatabaseProvider } from "../index";

import ReactJson from "react-json-view";

const BatchedWriteExamples = () => {
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
                    path: `user_bookmarks/G_K_5onxu/`,
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

const TransactionExamples = () => {
  return (
    <React.Fragment>
      <FirestoreTransaction>
        {({ runTransaction }) => {
          return (
            <div>
              <button
                onClick={() => {
                  runTransaction(
                    async ({ transaction, get, update, fDelete }) => {
                      const PATH = "user_bookmarks/G_K_5onxu/";
                      const res = await get({
                        path: PATH
                      });
                      const data = res.data();
                      update(PATH, {
                        ...data,
                        [`Hai-${Date.now()}`]: Date.now()
                      });
                      // fDelete(`${PATH}`);
                    }
                  );
                }}
              >
                runTransaction
              </button>
            </div>
          );
        }}
      </FirestoreTransaction>
    </React.Fragment>
  );
};

const MutationExamples = () => {
  return (
    <React.Fragment>
      <FirestoreMutation type="set" path="/user_bookmarks/G_K_5onxu">
        {({ runMutation }) => {
          return (
            <div>
              <h2> Mutate state </h2>
              <button
                onClick={() => {
                  runMutation({
                    nowOnCli: Date.now(),
                    nowOnServer: firebase.firestore.FieldValue.serverTimestamp()
                  }).then(res => {
                    console.log("Ran mutation ", res);
                  });
                }}
              >
                Mutate Set
              </button>
            </div>
          );
        }}
      </FirestoreMutation>
      <FirestoreMutation type="add" path="/user_bookmarks/">
        {({ runMutation }) => {
          return (
            <div>
              <h2> Mutate state </h2>
              <button
                onClick={() => {
                  runMutation({
                    nowOnCli: Date.now(),
                    nowOnServer: firebase.firestore.FieldValue.serverTimestamp()
                  }).then(res => {
                    console.log("Ran mutation ", res);
                  });
                }}
              >
                Mutate Add
              </button>
            </div>
          );
        }}
      </FirestoreMutation>
    </React.Fragment>
  );
};

const FirestoreDocumentExamples = () => {
  return (
    <FirestoreDocument path="/user_bookmarks/G_K_5onxu">
      {d => {
        return <ReactJson src={d} />;
      }}
    </FirestoreDocument>
  );
};

const FirestoreCollectionExamples = () => {
  return (
    <React.Fragment>
      <FirestoreCollection path="/user_bookmarks/" limit={2}>
        {d => {
          return d.isLoading ? "Loading" : <ReactJson src={d} />;
        }}
      </FirestoreCollection>
    </React.Fragment>
  );
};

const App = () => {
  return (
    <FirestoreProvider {...config} firebase={firebase}>
      <div>oh hai</div>

      {/* <BatchedWriteExamples /> */}
      <TransactionExamples />
      <MutationExamples />
      <FirestoreDocumentExamples />
      <FirestoreCollectionExamples />
    </FirestoreProvider>
  );
};
render(<App />, document.getElementById("root"));
