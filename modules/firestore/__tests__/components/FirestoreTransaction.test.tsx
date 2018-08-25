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
  FirestoreTransaction
} from "../../src/";
import { before, after } from "../../src/test-utils";
import { config } from "../../src/demo/test-credentials";

test(
  "FirestoreTransaction (beta)",
  async () => {
    const path = "user_bookmarks/test";
    await before(path);
    const value = { test: "data" };
    const { getByText, getByTestId } = render(
      <FirestoreProvider firebase={firebase} {...config}>
        <FirestoreTransaction>
          {({ runTransaction }) => {
            return (
              <div>
                <button
                  data-testid="test-set"
                  onClick={async () => {
                    await runTransaction(async ({ get, update }) => {
                      const res = await get({
                        path
                      });
                      const data = res.data();
                      await update(path, {
                        ...data,
                        a: isNaN(parseInt(data.a, 10)) ? 1 : data.a + 1
                      });
                    });
                  }}
                >
                  runTransaction
                </button>
              </div>
            );
          }}
        </FirestoreTransaction>
        <FirestoreDocument path={`${path}`}>
          {value => {
            return (
              <div>
                {value.value &&
                  value.value[0] !== null &&
                  value.value[0].a && (
                    <div data-testid="test-value">
                      {JSON.stringify(value.value[0].a)}
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
      waitForElement(() => getByTestId("test-value"), { timeout: 15000 }),
      waitForElement(() => getByTestId("test-path")),
      waitForElement(() => getByTestId("test-is-loading"))
    ]);
    // console.log("VALUE  ", getNodeText(testValueEl));
    const v = JSON.parse(getNodeText(testValueEl));
    expect(v).toEqual(1);
    cleanup();
    await after(path);
  },
  15000
);
