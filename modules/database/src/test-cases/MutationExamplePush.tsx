import * as React from "react";
import * as firebase from "firebase/app";
import "firebase/database";
import { State } from "react-powerplug";
import { FirebaseDatabaseProvider, FirebaseDatabaseMutation } from "../";
import { config } from "../demo/test-credentials";

import { IfNotFalsy } from "../test-utils";

export const MutationExamplePush = ({
  path,
  value
}: {
  path: string;
  value: any;
}) => (
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
                    const { key } = (await runMutation(value)) as {
                      key: string;
                    };
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
