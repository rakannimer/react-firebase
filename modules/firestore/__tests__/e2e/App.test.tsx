import * as React from "react";
import {
  render,
  getNodeText,
  fireEvent,
  waitForElement
} from "react-testing-library";
import {
  App,
  testCollectionPath,
  testDocPath,
  testDocValue,
  testDocUpdate
} from "../../src/demo/App";

import {
  setValueAtPath,
  getValueAtPath,
  deleteValueAtPath
} from "../../src/test-utils";

export const before = async () => {
  await deleteValueAtPath(testDocPath);
  const val = await getValueAtPath(testDocPath);
  expect(val).toEqual(undefined);
  await setValueAtPath(testDocPath, { c: "d" });
};

export const after = async (path = testDocPath) => {
  await deleteValueAtPath(testDocPath);
};

test(
  "update-document",
  async () => {
    await before();
    const { getByTestId } = render(<App />);
    fireEvent.click(getByTestId("update-document"));
    await waitForElement(() => getByTestId("update-document-result"), {
      timeout: 10000
    });
    const addedKeys = Object.keys(
      JSON.parse(getNodeText(getByTestId("update-document-result")))
    );
    // throw JSON.parse(getNodeText(getByTestId("update-document-result")));
    Object.keys(testDocUpdate).forEach(testKey => {
      expect(addedKeys).toContain(testKey);
    });
    await after();
  },
  10000
);

test(
  "set-document",
  async () => {
    // Initialize
    const { getByText, getByTestId } = render(<App />);
    await deleteValueAtPath(testDocPath);
    const val = await getValueAtPath(testDocPath);
    expect(val).toEqual(undefined);

    // Set Document
    fireEvent.click(getByTestId("set-document"));
    await waitForElement(() => getByTestId("set-document-result"), {
      timeout: 10000
    });
    const addedKeys = Object.keys(
      JSON.parse(getNodeText(getByTestId("set-document-result")))
    );
    Object.keys(testDocValue).forEach(testKey => {
      expect(addedKeys).toContain(testKey);
    });
  },
  10000
);
