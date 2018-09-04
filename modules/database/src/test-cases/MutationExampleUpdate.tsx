import * as React from "react";
import * as firebase from "firebase/app";
import "firebase/database";
import { State } from "react-powerplug";
import { FirebaseDatabaseProvider, FirebaseDatabaseMutation } from "..";
import { config } from "../demo/test-credentials";

import { IfNotFalsy, WithTestId, s } from "../test-utils";

export const MutationExampleUpdate = ({
  path,
  value
}: {
  path: string;
  value: any;
}) => (
  <FirebaseDatabaseProvider firebase={firebase} {...config}>
    <State initial={{ hasUpdated: false }}>
      {({ state, setState }) => (
        <React.Fragment>
          <FirebaseDatabaseMutation type="update" path={path}>
            {({ runMutation }) => {
              return (
                <WithTestId id="test-push">
                  <button
                    onClick={() => {
                      runMutation(value).then(() => {
                        setState({ hasUpdated: true });
                      });
                    }}
                  >
                    Push
                  </button>
                </WithTestId>
              );
            }}
          </FirebaseDatabaseMutation>

          <IfNotFalsy condition={state.hasUpdated}>
            <WithTestId id="test-push-result">
              <div>{s(state.hasUpdated)}</div>
            </WithTestId>
          </IfNotFalsy>
        </React.Fragment>
      )}
    </State>
  </FirebaseDatabaseProvider>
);
