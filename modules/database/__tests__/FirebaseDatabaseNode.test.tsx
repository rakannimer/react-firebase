import * as React from "react";
import {
  render,
  getNodeText,
  waitForElement,
  cleanup
} from "react-testing-library";
import "firebase/database";

import {
  getValueAtPath,
  setValueAtPath,
  deleteValueAtPath,
  p,
  isBoolean
} from "../src/test-utils";
import { NodeExampleBasic } from "../src/test-cases/NodeExampleBasic";

describe("DatabaseNode", () => {
  let testBasePath = `/__tests__/user_bookmark/`;
  let testPath = `${testBasePath}testPath`;
  let testListPath = `/__tests__/user_bookmarks/`;
  let testPathValue = {
    ohHai: "Mark"
  };
  let testListPathValues = Array.from({ length: 10 }, v => ({
    a: Math.floor(Math.random() * 10)
  })).reduce((acc, cur) => {
    acc[`KEY_${cur.a}`] = cur;
    return acc;
  }, {});
  beforeAll(async () => {
    await deleteValueAtPath(testPath);
    const val = await getValueAtPath(testPath);
    expect(val).toBeNull();
    await setValueAtPath(testPath, testPathValue);
    await setValueAtPath(testListPath, testListPathValues);
  });
  afterAll(async () => {
    await deleteValueAtPath(testPath);
    await deleteValueAtPath(testListPath);
    // const val = await getValueAtPath(testPath);
    // expect(val).toBeNull();
  });
  afterEach(async () => {
    await cleanup();
  });
  test("FirebaseDatabaseNode", async () => {
    const { getByTestId } = render(<NodeExampleBasic path={testPath} />);
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
      <NodeExampleBasic path={testPath} keysOnly />
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

  test("FirebaseDatabaseNode isList", async () => {
    const { getByTestId } = render(
      <NodeExampleBasic path={testListPath} isList />
    );
    const [value, path, isLoading] = await Promise.all([
      waitForElement(() => getByTestId("test-value")).then(getNodeText),
      waitForElement(() => getByTestId("test-path")).then(getNodeText),
      waitForElement(() => getByTestId("test-is-loading")).then(getNodeText)
    ]);
    const testKeys = Object.keys(testListPathValues);
    const testValues = testKeys.map(key => testListPathValues[key].a);
    const receivedValues = p(value);
    expect(receivedValues.length).toEqual(testKeys.length);
    const receivedKeys = receivedValues.map(v => v.key);
    const receivedData = receivedValues.map(v => v.data.a);
    for (let key of testKeys) {
      expect(receivedKeys).toContain(key);
    }
    for (let val of testValues) {
      expect(receivedData).toContain(val);
    }
  });
});
