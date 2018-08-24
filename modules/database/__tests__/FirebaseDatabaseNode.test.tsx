import * as React from "react";
import { render } from "react-testing-library";
import * as firebase from "firebase/app";
import { FirebaseDatabaseProvider, FirebaseDatabaseNode } from "../src/";
import { config } from "../src/demo/test-credentials";

test("FirebaseDatabaseNode", async () => {
  const { getByText, getByTestId } = render(
    <FirebaseDatabaseProvider firebase={firebase} {...config}>
      <FirebaseDatabaseNode path={"user_bookmarks"}>
        {value => {
          return (
            <div>
              <div data-testid="test-value">
                Value {JSON.stringify(value.value)}{" "}
              </div>
              <div data-testid="test-path">
                Path {JSON.stringify(value.path)}{" "}
              </div>
              <div data-testid="test-is-loading">
                isLoading {JSON.stringify(value.isLoading)}{" "}
              </div>
            </div>
          );
        }}
      </FirebaseDatabaseNode>
    </FirebaseDatabaseProvider>
  );
  await Promise.all([
    getByTestId("test-value"),
    getByTestId("test-path"),
    getByTestId("test-is-loading")
  ]);
});
