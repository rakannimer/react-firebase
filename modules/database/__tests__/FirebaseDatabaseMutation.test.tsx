import * as React from "react";
import {
  render,
  fireEvent,
  waitForElement,
  getNodeText,
  cleanup
} from "react-testing-library";
import * as firebase from "firebase/app";
import "firebase/database";
import { State } from "react-powerplug";
import { FirebaseDatabaseProvider, FirebaseDatabaseMutation } from "../src/";
import { config } from "../src/demo/test-credentials";

const TEST_TIMEOUT = 10000;
import {
  isBoolean,
  deleteValueAtPath,
  getValueAtPath,
  setValueAtPath,
  IfNotFalsy,
  WithTestId,
  s,
  p
} from "../src/test-utils";

const MutationExamplePush = ({ path, value }) => (
  <FirebaseDatabaseProvider firebase={firebase} {...config}>
    <State initial={{ pushedKey: "" }}>
      {({ state, setState }) => (
        <React.Fragment>
          <FirebaseDatabaseMutation type="push" path={path}>
            {({ runMutation }) => {
              return (
                <button
                  data-testid="test-push"
                  onClick={async () => {
                    const { key } = await runMutation(value);
                    setState({ pushedKey: key });
                  }}
                >
                  Push
                </button>
              );
            }}
          </FirebaseDatabaseMutation>

          <IfNotFalsy condition={state.pushedKey}>
            <div data-testid="test-push-result">{state.pushedKey}</div>
          </IfNotFalsy>
        </React.Fragment>
      )}
    </State>
  </FirebaseDatabaseProvider>
);

const MutationExampleUpdate = ({ path, value }) => (
  <FirebaseDatabaseProvider firebase={firebase} {...config}>
    <State initial={{ hasUpdated: false }}>
      {({ state, setState }) => (
        <React.Fragment>
          <FirebaseDatabaseMutation type="update" path={path}>
            {({ runMutation }) => {
              return (
                <button
                  data-testid="test-push"
                  onClick={async () => {
                    const { key } = await runMutation(value);
                    setState({ hasUpdated: true });
                  }}
                >
                  Push
                </button>
              );
            }}
          </FirebaseDatabaseMutation>

          <IfNotFalsy condition={state.hasUpdated}>
            <div data-testid="test-push-result">{s(state.hasUpdated)}</div>
          </IfNotFalsy>
        </React.Fragment>
      )}
    </State>
  </FirebaseDatabaseProvider>
);

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
