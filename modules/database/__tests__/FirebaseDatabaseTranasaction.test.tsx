import * as React from "react";
import {
  render,
  fireEvent,
  waitForElement,
  getNodeText
} from "react-testing-library";
import * as firebase from "firebase";
import { State } from "react-powerplug";
import {
  FirebaseDatabaseProvider,
  FirebaseDatabaseNode,
  FirebaseDatabaseTransaction
} from "../src/";
import { config } from "../src/demo/test-credentials";

test("FirebaseDatabaseTransaction", async () => {
  const path = "TEST_NAMESPACE/user_bookmarks/3/usage_count";
  const { getByTestId } = render(
    <FirebaseDatabaseProvider firebase={firebase} {...config}>
      <FirebaseDatabaseNode path={path}>
        {({ value }) => (
          <div data-testid="test-transaction-result">{value}</div>
        )}
      </FirebaseDatabaseNode>
      <State initial={{ count: null }}>
        {({ state }) => {
          return (
            <FirebaseDatabaseTransaction path={path}>
              {({ runTransaction }) => (
                <div>
                  <button
                    data-testid="test-transaction"
                    onClick={() => {
                      runTransaction({
                        reducer: val => {
                          if (val === null) {
                            return 1;
                          } else {
                            return val + 1;
                          }
                        }
                      }).then(() => {
                        console.log("Ran transaction");
                      });
                    }}
                  >
                    Click me to run transaction
                  </button>
                </div>
              )}
            </FirebaseDatabaseTransaction>
          );
        }}
      </State>
    </FirebaseDatabaseProvider>
  );
  const dbRef = firebase
    .app()
    .database()
    .ref(path);
  await dbRef.set(null);
  const initialValue = (await dbRef.once("value")).val();
  expect(initialValue).toBe(null);
  const pushMutationButton = getByTestId("test-transaction");
  await waitForElement(() => pushMutationButton);
  fireEvent.click(pushMutationButton);
  expect(getNodeText(getByTestId("test-transaction-result"))).toEqual("1");
  fireEvent.click(pushMutationButton);
  expect(getNodeText(getByTestId("test-transaction-result"))).toEqual("2");
});
