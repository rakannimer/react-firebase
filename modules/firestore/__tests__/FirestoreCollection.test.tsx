import * as React from "react";
import {
  render,
  cleanup,
  getNodeText,
  waitForElement,
  fireEvent
} from "react-testing-library";
import * as firebase from "firebase/app";
import { FirestoreProvider, FirestoreCollection } from "../src/";
import { config } from "../src/demo/test-credentials";

test(
  "FirestoreCollection",
  async () => {
    const path = "user_bookmarks/";
    const { getByText, getByTestId } = render(
      <FirestoreProvider firebase={firebase} {...config}>
        <FirestoreCollection path={path}>
          {value => {
            return (
              <div>
                {value.isLoading === false && (
                  <div data-testid="test-value">
                    {JSON.stringify(value.value)}
                  </div>
                )}
                {value.path && <div data-testid="test-path">{value.path}</div>}
                <div data-testid="test-is-loading">{value.isLoading}</div>
              </div>
            );
          }}
        </FirestoreCollection>
      </FirestoreProvider>
    );

    const [testValueEl, testPathEl] = await Promise.all([
      waitForElement(() => getByTestId("test-value"), { timeout: 10000 }),
      waitForElement(() => getByTestId("test-path")),
      waitForElement(() => getByTestId("test-is-loading"))
    ]);
    // console.log("VALUE  ", getNodeText(testValueEl));
    expect(JSON.parse(getNodeText(testValueEl)).length).toBeGreaterThanOrEqual(
      1
    );
    expect(getNodeText(testPathEl)).toEqual(path);
    cleanup();
  },
  10000
);
