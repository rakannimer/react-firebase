import * as React from "react";
import {
  render,
  fireEvent,
  waitForElement,
  getNodeText
} from "react-testing-library";
import * as firebase from "firebase";
import { State } from "react-powerplug";
import {
  FirebaseDatabaseProvider,
  FirebaseDatabaseMutation,
  FirebaseDatabaseNode
} from "../src/";
import { config } from "../src/demo/test-credentials";

const TEST_TIMEOUT = 10000;

test(
  "FirebaseDatabaseMutation push",
  async () => {
    const { getByText, getByTestId } = render(
      <FirebaseDatabaseProvider firebase={firebase} {...config}>
        <State initial={{ pushedKey: "" }}>
          {({ state, setState }) => (
            <React.Fragment>
              <FirebaseDatabaseMutation
                type="push"
                path={"TEST_NAMESPACE/user_bookmarks"}
              >
                {({ runMutation }) => {
                  return (
                    <div>
                      <button
                        data-testid="test-push"
                        onClick={async () => {
                          const { key } = await runMutation({ TEST: "DATA" });
                          setState({ pushedKey: key });
                        }}
                      >
                        Push
                      </button>
                    </div>
                  );
                }}
              </FirebaseDatabaseMutation>
              {state.pushedKey !== "" && (
                <div data-testid="test-push-result">{state.pushedKey}</div>
              )}
            </React.Fragment>
          )}
        </State>
      </FirebaseDatabaseProvider>
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
  "FirebaseDatabaseMutation update",
  async () => {
    const testData = { TEST: "DATA" };
    const path = "TEST_NAMESPACE/user_bookmarks/1";

    const { getByText, getByTestId } = render(
      <FirebaseDatabaseProvider firebase={firebase} {...config}>
        <FirebaseDatabaseNode path={path}>
          {({ value }) => (
            <div data-testid="test-update-result">{JSON.stringify(value)}</div>
          )}
        </FirebaseDatabaseNode>
        <State initial={{ value: "" }}>
          {({ state, setState }) => (
            <React.Fragment>
              <FirebaseDatabaseMutation type="update" path={path}>
                {({ runMutation }) => {
                  return (
                    <div>
                      <button
                        data-testid="test-update"
                        onClick={async () => {
                          const { value } = await runMutation(testData);
                          setState({ value });
                        }}
                      >
                        Update
                      </button>
                    </div>
                  );
                }}
              </FirebaseDatabaseMutation>

              <div data-testid="test-update-result">
                {JSON.stringify(state.value)}
              </div>
            </React.Fragment>
          )}
        </State>
      </FirebaseDatabaseProvider>
    );
    const dbRef = firebase
      .app()
      .database()
      .ref("TEST_NAMESPACE/user_bookmarks/1");
    await dbRef.set(null);
    // await dbRef.once("value");
    const initialValue = (await dbRef.once("value")).val();
    expect(initialValue).toBe(null);
    const pushMutationButton = getByTestId("test-update");
    await waitForElement(() => pushMutationButton);
    fireEvent.click(pushMutationButton);
    await waitForElement(() => getByTestId("test-update-result"));
    expect(getNodeText(getByTestId("test-update-result"))).toEqual(
      JSON.stringify(testData)
    );
    await dbRef.set(null);
  },
  TEST_TIMEOUT
);

test(
  "FirebaseDatabaseMutation set",
  async () => {
    const testData = { TEST: "DATA" };
    const { getByText, getByTestId } = render(
      <FirebaseDatabaseProvider firebase={firebase} {...config}>
        <State initial={{ value: "" }}>
          {({ state, setState }) => (
            <React.Fragment>
              <FirebaseDatabaseMutation
                type="set"
                path={"TEST_NAMESPACE/user_bookmarks/2"}
              >
                {({ runMutation }) => {
                  return (
                    <div>
                      <button
                        data-testid="test-update"
                        onClick={async () => {
                          const { value } = await runMutation(testData);
                          setState({ value });
                        }}
                      >
                        Update
                      </button>
                    </div>
                  );
                }}
              </FirebaseDatabaseMutation>
              {state.value !== "" && (
                <div data-testid="test-update-result">
                  {JSON.stringify(state.value)}
                </div>
              )}
            </React.Fragment>
          )}
        </State>
      </FirebaseDatabaseProvider>
    );
    const dbRef = firebase
      .app()
      .database()
      .ref("TEST_NAMESPACE/user_bookmarks/1");
    await dbRef.set(null);
    // await dbRef.once("value");
    const initialValue = (await dbRef.once("value")).val();
    expect(initialValue).toBe(null);
    const pushMutationButton = getByTestId("test-update");
    await waitForElement(() => pushMutationButton);
    fireEvent.click(pushMutationButton);
    await waitForElement(() => getByTestId("test-update-result"));
    expect(getNodeText(getByTestId("test-update-result"))).toEqual(
      JSON.stringify(testData)
    );
    await dbRef.set(null);
  },
  TEST_TIMEOUT
);
