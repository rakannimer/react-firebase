import * as React from "react";
import {
  render,
  cleanup,
  getNodeText,
  waitForElement,
  fireEvent
} from "react-testing-library";
import * as firebase from "firebase/app";
import "firebase/firestore";
import {
  FirestoreProvider,
  FirestoreDocument,
  FirestoreBatchedWrite
} from "../../src/";
import { config } from "../../src/demo/test-credentials";

test("FirestoreDocument", async () => {
  const path = "user_bookmarks/test";
  const value = { test: "data" };
  const { getByText, getByTestId } = render(
    <FirestoreProvider firebase={firebase} {...config}>
      <FirestoreBatchedWrite>
        {({ addMutationToBatch, commit }) => {
          // console.log()
          return (
            <div>
              <h2>Batched write</h2>
              <button
                data-testid="test-set"
                onClick={() => {
                  addMutationToBatch({
                    path,
                    value: { [`a-key`]: "a-value" },
                    type: "set"
                  });
                }}
              >
                Add to batch
              </button>
              <button
                data-testid="test-commit"
                onClick={() => {
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
      <FirestoreDocument path={path}>
        {value => {
          return (
            <div>
              {value.value && (
                <div data-testid="test-value">
                  {JSON.stringify(value.value)}
                </div>
              )}
              {value.path && <div data-testid="test-path">{value.path}</div>}
              <div data-testid="test-is-loading">{value.isLoading}</div>
            </div>
          );
        }}
      </FirestoreDocument>
    </FirestoreProvider>
  );
  await waitForElement(() => getByTestId("test-set"));
  fireEvent.click(getByTestId("test-set"));
  fireEvent.click(getByTestId("test-commit"));
  const [testValueEl, testPathEl] = await Promise.all([
    waitForElement(() => getByTestId("test-value")),
    waitForElement(() => getByTestId("test-path")),
    waitForElement(() => getByTestId("test-is-loading"))
  ]);
  const val = JSON.parse(getNodeText(testValueEl));
  expect("a-key" in val).toEqual(true);
  expect(getNodeText(testPathEl)).toEqual(path);
  cleanup();
});
