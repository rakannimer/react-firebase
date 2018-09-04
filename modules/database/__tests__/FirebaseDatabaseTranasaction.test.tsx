import * as React from "react";
import {
  render,
  fireEvent,
  waitForElement,
  cleanup
} from "react-testing-library";
import * as firebase from "firebase/app";
import "firebase/database";
import { State } from "react-powerplug";
import { FirebaseDatabaseProvider, FirebaseDatabaseTransaction } from "../src/";
import { config } from "../src/demo/test-credentials";
import {
  IfNotFalsy,
  deleteValueAtPath,
  getValueAtPath,
  setValueAtPath
} from "../src/test-utils";
const TEST_TIMEOUT = 15000;
describe("FirebaseDatabaseMutation", () => {
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
    "tranasaction",
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
      // expect(getNodeText(getByTestId("test-push-result")).length).toBe(20);
    },
    TEST_TIMEOUT
  );
});
const TransactionExample = ({ path }) => {
  return (
    <FirebaseDatabaseProvider firebase={firebase} {...config}>
      <State initial={{ hasUpdated: false }}>
        {({ state, setState }) => {
          return (
            <React.Fragment>
              <IfNotFalsy condition={state.hasUpdated}>
                <div data-testid="test-transaction-result">
                  {state.hasUpdated}
                </div>
              </IfNotFalsy>
              <FirebaseDatabaseTransaction path={path}>
                {({ runTransaction }) => (
                  <div>
                    <button
                      data-testid="test-transaction"
                      onClick={() => {
                        runTransaction({
                          reducer: val => {
                            if (val === null) {
                              return 1;
                            } else {
                              return val + 1;
                            }
                          }
                        }).then(() => {
                          setState({ hasUpdated: true });
                          console.log("Ran transaction");
                        });
                      }}
                    >
                      Click me to run transaction
                    </button>
                  </div>
                )}
              </FirebaseDatabaseTransaction>
            </React.Fragment>
          );
        }}
      </State>
    </FirebaseDatabaseProvider>
  );
};
