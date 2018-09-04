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

import {
  getValueAtPath,
  setValueAtPath,
  deleteValueAtPath,
  IfNotFalsy,
  s,
  WithTestId,
  p,
  isBoolean
} from "../src/test-utils";

describe("DatabaseNode", () => {
  let testPath = `/__tests__/${Date.now()}/user_bookmarks/testPath`;
  let testPathValue = {
    ohHai: "Mark"
  };
  beforeAll(async () => {
    await deleteValueAtPath(testPath);
    const val = await getValueAtPath(testPath);
    expect(val).toBeNull();
    await setValueAtPath(testPath, testPathValue);
  });
  afterAll(async () => {
    await deleteValueAtPath(testPath);
    const val = await getValueAtPath(testPath);
    expect(val).toBeNull();
  });
  afterEach(async () => {
    await cleanup();
  });
  test("FirebaseDatabaseNode", async () => {
    const { getByTestId } = render(
      <FirebaseDatabaseProvider firebase={firebase} {...config}>
        <FirebaseDatabaseNode path={testPath}>
          {value => {
            return (
              <div>
                <IfNotFalsy condition={value.value}>
                  <WithTestId id={"test-value"}>
                    <div>{s(value.value)}</div>
                  </WithTestId>
                </IfNotFalsy>
                <IfNotFalsy condition={value.path}>
                  <WithTestId id={"test-path"}>
                    <div>{s(value.path)}</div>
                  </WithTestId>
                </IfNotFalsy>
                <IfNotFalsy condition={value.path}>
                  <WithTestId id={"test-is-loading"}>
                    <div>{s(value.isLoading)}</div>
                  </WithTestId>
                </IfNotFalsy>
              </div>
            );
          }}
        </FirebaseDatabaseNode>
      </FirebaseDatabaseProvider>
    );
    const [value, path, isLoading] = await Promise.all([
      waitForElement(() => getByTestId("test-value")).then(getNodeText),
      waitForElement(() => getByTestId("test-path")).then(getNodeText),
      waitForElement(() => getByTestId("test-is-loading")).then(getNodeText)
    ]);
    expect(p(value)).toEqual(testPathValue);
    expect(p(path)).toEqual(testPath);
    expect(isBoolean(p(isLoading))).toEqual(true);
    // await cleanup();
  });
  test("FirebaseDatabaseNode keysOnly", async () => {
    const { getByTestId } = render(
      <FirebaseDatabaseProvider firebase={firebase} {...config}>
        <FirebaseDatabaseNode path={testPath} keysOnly>
          {value => {
            return (
              <div>
                <IfNotFalsy condition={value.value}>
                  <WithTestId id={"test-value"}>
                    <div>{s(value.value)}</div>
                  </WithTestId>
                </IfNotFalsy>
                <IfNotFalsy condition={value.path}>
                  <WithTestId id={"test-path"}>
                    <div>{s(value.path)}</div>
                  </WithTestId>
                </IfNotFalsy>
                <WithTestId id={"test-is-loading"}>
                  <div>{s(value.isLoading)}</div>
                </WithTestId>
              </div>
            );
          }}
        </FirebaseDatabaseNode>
      </FirebaseDatabaseProvider>
    );
    const [value, path, isLoading] = await Promise.all([
      waitForElement(() => getByTestId("test-value")).then(getNodeText),
      waitForElement(() => getByTestId("test-path")).then(getNodeText),
      waitForElement(() => getByTestId("test-is-loading")).then(getNodeText)
    ]);
    expect(p(value)).toEqual(Object.keys(testPathValue));
    expect(p(path)).toEqual(testPath);
    expect(isBoolean(p(isLoading))).toEqual(true);
  });
});
