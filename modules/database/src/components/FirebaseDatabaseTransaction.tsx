import * as React from "react";
import { renderAndAddProps } from "render-and-add-props";

import { FirebaseDatabaseContextConsumer } from "../Context";
import { FirebaseDatabaseProviderState } from "../types";
export { FirebaseDatabaseProvider } from "./FirebaseDatabaseProvider";

export type Nullable<T> = T | null;

export type FirebaseTransactionProps = {
  path: string;
};

export type FirebaseDatabaseTransactionWithContextProps = FirebaseTransactionProps &
  FirebaseDatabaseProviderState;

export type RunTransaction = (
  { reducer }: { reducer: (value: any) => any }
) => Promise<{
  path: FirebaseTransactionProps["path"];
}>;

// Ref :  https://firebase.google.com/docs/database/web/read-and-write#save_data_as_transactions

export class FirebaseDatabaseTransactionWithContext extends React.Component<
  FirebaseDatabaseTransactionWithContextProps
> {
  createTransactionRunner = () => {
    const { firebase, path } = this.props;
    const firebaseRef = firebase
      .app()
      .database()
      .ref(path);
    const runTransaction: RunTransaction = async ({ reducer }) => {
      await firebaseRef.transaction(reducer);
      return { path };
    };
    return runTransaction;
  };
  shouldComponentUpdate(
    nextProps: FirebaseDatabaseTransactionWithContextProps
  ) {
    return (
      nextProps.path !== this.props.path ||
      nextProps.firebase !== this.props.firebase
    );
  }
  render() {
    const { children } = this.props;
    const runTransaction = this.createTransactionRunner();
    return renderAndAddProps(children, { runTransaction, ...this.props });
  }
}

export class FirebaseDatabaseTransaction extends React.Component<
  FirebaseTransactionProps
> {
  render() {
    const { children, path } = this.props;
    return (
      <FirebaseDatabaseContextConsumer>
        {context => (
          <FirebaseDatabaseTransactionWithContext
            path={path}
            {...context}
            children={children}
          />
        )}
      </FirebaseDatabaseContextConsumer>
    );
  }
}
