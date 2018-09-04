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
});
