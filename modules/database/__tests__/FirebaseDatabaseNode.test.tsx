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
import { App as Demo, formState } from "../src/demo/App";
export const getManyByTestId = (arr: any[], { getByTestId }) => {
  return Promise.all(
    arr.map(val => waitForElement(() => getByTestId(val)).then(getNodeText))
  );
};
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
describe("DatabaseNode", () => {
  let testBasePath = `/__tests__/user_bookmark/`;
  let testPath = `${testBasePath}testPath`;
  let testListPath = `/__tests__/user_bookmarks/`;
  let testPathValue = {
    ohHai: "Mark"
  };
  let testListPathValues = Array.from({ length: 10 }, (v, i) => ({
    TEST_VAL: i
  })).reduce((acc, cur) => {
    acc[`KEY_${cur.TEST_VAL}`] = cur;
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
  beforeEach(async () => {
    await cleanup();
  });
  afterEach(async () => {
    await cleanup();
  });

  test("FirebaseDatabaseNode", async () => {
    const { getByTestId } = render(<NodeExampleBasic path={testPath} />);
    const [value, path, isLoading] = await getManyByTestId(
      ["test-value", "test-path", "test-is-loading"],
      { getByTestId }
    );
    expect(p(value)).toEqual(testPathValue);
    expect(p(path)).toEqual(testPath);
    expect(isBoolean(p(isLoading))).toEqual(true);
    // await cleanup();
  });
  test("FirebaseDatabaseNode keysOnly", async () => {
    const { getByTestId } = render(
      <NodeExampleBasic path={testPath} keysOnly />
    );
    const [value, path, isLoading] = await getManyByTestId(
      ["test-value", "test-path", "test-is-loading"],
      { getByTestId }
    );
    expect(p(value)).toEqual(Object.keys(testPathValue));
    expect(p(path)).toEqual(testPath);
    expect(isBoolean(p(isLoading))).toEqual(true);
  });

  test("FirebaseDatabaseNode isList", async () => {
    const { getByTestId, unmount } = render(
      <NodeExampleBasic path={testListPath} isList />
    );
    const [value, path, isLoading] = await getManyByTestId(
      ["test-value", "test-path", "test-is-loading"],
      { getByTestId }
    );
    const testKeys = Object.keys(testListPathValues);
    const testValues = testKeys.map(key => testListPathValues[key].TEST_VAL);
    const receivedValues = p(value);
    expect(receivedValues.length).toEqual(testKeys.length);
    const receivedKeys = receivedValues.map(v => v.key);
    const receivedData = receivedValues.map(v => v.data.TEST_VAL);
    for (let key of testKeys) {
      expect(receivedKeys).toContain(key);
    }
    for (let val of testValues) {
      expect(receivedData).toContain(val);
    }
    unmount();
  });
  test("FirebaseDatabaseNode with changing limitToFirst", async () => {
    await cleanup();
    const initialTest = async () => {
      const firstRender = render(
        <NodeExampleBasic
          path={testListPath}
          limitToFirst={2}
          orderByChild={"TEST_VAL"}
        />
      );
      const { getByTestId } = firstRender;
      const [value, path, isLoading] = await getManyByTestId(
        ["test-value", "test-path", "test-is-loading"],
        { getByTestId }
      );
      const receivedValues = p(value);
      expect(Object.keys(receivedValues)).toEqual(["KEY_0", "KEY_1"]);
      return firstRender;
    };
    const changePropsTest = async firstRender => {
      firstRender.rerender(
        <NodeExampleBasic
          path={testListPath}
          limitToFirst={4}
          orderByChild={"TEST_VAL"}
        />
      );
      const { getByTestId } = firstRender;

      const [value, path, isLoading] = await getManyByTestId(
        ["test-value", "test-path", "test-is-loading"],
        { getByTestId }
      );
      const receivedValues = p(value);
      expect(Object.keys(receivedValues)).toEqual([
        "KEY_0",
        "KEY_1",
        "KEY_2",
        "KEY_3"
      ]);
    };
    const rerender = await initialTest();
    await changePropsTest(rerender);
  });
});
