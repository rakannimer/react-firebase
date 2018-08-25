import * as React from "react";
import {
  render,
  cleanup,
  getNodeText,
  waitForElement,
  fireEvent
} from "react-testing-library";
import * as firebase from "firebase/app";
import {
  FirestoreProvider,
  FirestoreDocument,
  FirestoreMutation
} from "../../src/";
import { config } from "../../src/demo/test-credentials";

test("FirestoreDocument", async () => {
  const path = "user_bookmarks/test";
  const value = { test: "data" };
  const { getByText, getByTestId } = render(
    <FirestoreProvider firebase={firebase} {...config}>
      <FirestoreMutation type="set" path={path}>
        {({ runMutation }) => {
          return (
            <div>
              <h2> Mutate state </h2>
              <button
                data-testid="test-set"
                onClick={async () => {
                  const { path, value: val, type, key } = await runMutation(
                    value
                  );
                  expect(path).toEqual(path);
                  expect(val).toEqual(value);
                }}
              >
                Mutate Set
              </button>
            </div>
          );
        }}
      </FirestoreMutation>
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
  const [testValueEl, testPathEl] = await Promise.all([
    waitForElement(() => getByTestId("test-value")),
    waitForElement(() => getByTestId("test-path")),
    waitForElement(() => getByTestId("test-is-loading"))
  ]);
  // console.log("VALUE  ", getNodeText(testValueEl));
  expect(getNodeText(testValueEl)).toMatchInlineSnapshot(
    `"[{\\"test\\":\\"data\\",\\"__id\\":\\"test\\"}]"`
  );
  expect(getNodeText(testPathEl)).toEqual(path);
  cleanup();
});
