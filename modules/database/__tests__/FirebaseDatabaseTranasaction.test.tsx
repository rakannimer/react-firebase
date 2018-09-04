import * as React from "react";
import {
  render,
  fireEvent,
  waitForElement,
  cleanup
} from "react-testing-library";
import {
  deleteValueAtPath,
  getValueAtPath,
  setValueAtPath
} from "../src/test-utils";
const TEST_TIMEOUT = 15000;
import { TransactionExample } from "../src/test-cases/TransactionExampleBasic";

describe("FirebaseDatabaseTransaction", () => {
  let testPath = `/__tests__/${Date.now()}/user_bookmarks/testPath`;
  let testPathValue = 0;
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
  test(
    "tranasaction basic",
    async () => {
      const { getByTestId } = render(<TransactionExample path={testPath} />);
      const pushMutationButton = getByTestId("test-transaction");
      await waitForElement(() => pushMutationButton);
      fireEvent.click(pushMutationButton);
      await waitForElement(() => getByTestId("test-transaction-result"), {
        timeout: TEST_TIMEOUT
      });
      const val = await getValueAtPath(testPath);
      expect(val).toEqual(1);
    },
    TEST_TIMEOUT
  );
});
