import * as React from "react";
import {
  render,
  fireEvent,
  waitForElement,
  getNodeText,
  cleanup
} from "react-testing-library";

import {
  isBoolean,
  deleteValueAtPath,
  getValueAtPath,
  setValueAtPath,
  p
} from "../src/test-utils";
import { MutationExamplePush } from "../src/test-cases/MutationExamplePush";
import { MutationExampleUpdate } from "../src/test-cases/MutationExampleUpdate";

const TEST_TIMEOUT = 10000;

describe("FirebaseDatabaseMutation", () => {
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
  test(
    "push",
    async () => {
      const { getByTestId } = render(
        <MutationExamplePush path={testPath} value={testPathValue} />
      );
      const pushMutationButton = getByTestId("test-push");
      await waitForElement(() => pushMutationButton);
      fireEvent.click(pushMutationButton);
      await waitForElement(() => getByTestId("test-push-result"));
      expect(getNodeText(getByTestId("test-push-result")).length).toBe(20);
    },
    TEST_TIMEOUT
  );
  test(
    "update",
    async () => {
      const { getByTestId } = render(
        <MutationExampleUpdate path={testPath} value={testPathValue} />
      );
      const pushMutationButton = getByTestId("test-push");
      await waitForElement(() => pushMutationButton);
      fireEvent.click(pushMutationButton);
      await waitForElement(() => getByTestId("test-push-result"));
      expect(isBoolean(p(getNodeText(getByTestId("test-push-result"))))).toBe(
        true
      );
    },
    TEST_TIMEOUT
  );
});
