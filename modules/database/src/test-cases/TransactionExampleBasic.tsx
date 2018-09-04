import * as React from "react";
import * as firebase from "firebase/app";
import "firebase/database";
import { State } from "react-powerplug";
import { FirebaseDatabaseProvider, FirebaseDatabaseTransaction } from "../";
import { config } from "../demo/test-credentials";
import { IfNotFalsy } from "../test-utils";

export const TransactionExample = ({
  path,
  ...otherStuffMaybe
}: {
  path: string;
  [otherStuffMaybe: string]: any;
}) => {
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
              <FirebaseDatabaseTransaction path={path} {...otherStuffMaybe}>
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
