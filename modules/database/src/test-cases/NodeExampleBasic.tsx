import * as React from "react";

import * as firebase from "firebase/app";
import "firebase/database";
import { FirebaseDatabaseProvider, FirebaseDatabaseNode } from "../";
import { config } from "../demo/test-credentials";

import { IfNotFalsy, s, WithTestId } from "../test-utils";

export const NodeExampleBasic = ({
  path,
  ...otherStuffMaybe
}: {
  path: string;
  [otherStuffMaybe: string]: any;
}) => (
  <FirebaseDatabaseProvider firebase={firebase} {...config}>
    <FirebaseDatabaseNode path={path} {...otherStuffMaybe}>
      {value => {
        return (
          <div>
            <IfNotFalsy condition={value.value}>
              <WithTestId id={"test-value"}>
                <div>{s(value.value)}</div>
              </WithTestId>
            </IfNotFalsy>
            <IfNotFalsy condition={value.path}>
              <WithTestId id={"test-path"}>
                <div>{s(value.path)}</div>
              </WithTestId>
            </IfNotFalsy>
            <IfNotFalsy condition={value.path}>
              <WithTestId id={"test-is-loading"}>
                <div>{s(value.isLoading)}</div>
              </WithTestId>
            </IfNotFalsy>
          </div>
        );
      }}
    </FirebaseDatabaseNode>
  </FirebaseDatabaseProvider>
);
