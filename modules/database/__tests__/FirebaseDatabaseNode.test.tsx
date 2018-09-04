import * as React from "react";
import {
  render,
  getNodeText,
  waitForElement,
  cleanup
} from "react-testing-library";
import * as firebase from "firebase/app";
import "firebase/database";
import { FirebaseDatabaseProvider, FirebaseDatabaseNode } from "../src/";
import { config } from "../src/demo/test-credentials";

test("FirebaseDatabaseNode", async () => {
  const { getByText, getByTestId } = render(
    <FirebaseDatabaseProvider firebase={firebase} {...config}>
      <FirebaseDatabaseNode path={"user_bookmarks"} limitToFirst={2}>
        {value => {
          return (
            <div>
              {value.value && (
                <div data-testid="test-value">
                  {JSON.stringify(value.value)}
                </div>
              )}
              <div data-testid="test-path">
                Path {JSON.stringify(value.path)}
              </div>
              <div data-testid="test-is-loading">
                isLoading {JSON.stringify(value.isLoading)}
              </div>
            </div>
          );
        }}
      </FirebaseDatabaseNode>
    </FirebaseDatabaseProvider>
  );
  const valueNode = await waitForElement(() => getByTestId("test-value"));
  const value = JSON.parse(getNodeText(valueNode));
  const keys = Object.keys(value);
  const values = Array.from(Object.keys(value), i => value[keys[i]]);
  expect(keys.length).toBeGreaterThan(0);
  expect(values.length).toEqual(keys.length);
  await cleanup();
});

test("FirebaseDatabaseNode keysOnly", async () => {
  const { getByTestId } = render(
    <FirebaseDatabaseProvider firebase={firebase} {...config}>
      <FirebaseDatabaseNode path={"user_bookmarks"} limitToFirst={10} keysOnly>
        {value => {
          return (
            <div>
              {value.value !== null && (
                <div data-testid="test-value-keysOnly">
                  {JSON.stringify(value.value)}
                </div>
              )}
            </div>
          );
        }}
      </FirebaseDatabaseNode>
    </FirebaseDatabaseProvider>
  );
  const node = await waitForElement(() => getByTestId("test-value-keysOnly"));
  const keys = JSON.parse(getNodeText(node));
  expect(keys.length).toBeGreaterThan(0);
  await cleanup();
});
