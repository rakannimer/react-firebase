import * as React from "react";
import { renderAndAddProps } from "render-and-add-props";

import {
  Transaction,
  DocumentReference,
  SetOptions,
  DocumentData,
  Precondition,
  DocumentSnapshot
} from "@google-cloud/firestore";

import { FirestoreContextConsumer } from "../Context";
import { FirestoreProviderState, FirestoreQuery } from "../types";
import { getFirestoreQuery } from "../get-firestore-query";

export type FirestoreTranasactionWithContextProps = FirestoreProviderState &
  FirestoreTranasactionProps;

export type TransactionLogic = (
  t: {
    transaction: Transaction;
    get: (query: FirestoreQuery) => Promise<DocumentSnapshot>;
    update: (path: string, value: any) => Promise<Transaction>;
    set: (
      path: string,
      value: DocumentData,
      options?: SetOptions
    ) => Promise<Transaction>;
    fDelete: (
      path: string,
      precondition?: Precondition
    ) => Promise<Transaction>;
  }
) => Promise<any>;
export class FirestoreTranasactionWithContext extends React.Component<
  FirestoreTranasactionWithContextProps
> {
  createTransactionRunner = () => {
    const { firestore } = this.props;
    const runTransaction = async (transactionLogic: TransactionLogic) => {
      let transactionLogicWithHelpers = (transaction: Transaction) => {
        const get = async (query: FirestoreQuery) => {
          const ref = getFirestoreQuery({
            ...query,
            firestore
          }) as DocumentReference;
          return await transaction.get(ref);
        };
        const update = async (path: string, value: any) => {
          const ref = getFirestoreQuery({
            path,
            firestore
          }) as DocumentReference;
          return await transaction.update(ref, value);
        };

        const set = async (
          path: string,
          value: DocumentData,
          options?: SetOptions
        ) => {
          const ref = getFirestoreQuery({
            path,
            firestore
          }) as DocumentReference;
          return await transaction.set(ref, value, options);
        };

        const fDelete = async (path: string, precondition?: Precondition) => {
          const ref = getFirestoreQuery({
            path,
            firestore
          }) as DocumentReference;
          return await transaction.delete(ref);
        };
        return transactionLogic({ transaction, get, update, set, fDelete });
      };
      await firestore.runTransaction(
        transactionLogicWithHelpers as () => Promise<TransactionLogic>
      );
    };
    return runTransaction;
  };
  shouldComponentUpdate(nextProps: FirestoreTranasactionWithContextProps) {
    return nextProps.firebase !== this.props.firebase;
  }
  render() {
    const runTransaction = this.createTransactionRunner();
    return renderAndAddProps(this.props.children, {
      ...this.props,
      runTransaction
    });
  }
}

export type FirestoreTranasactionProps = {
  children: (
    {
      runTransaction
    }: { runTransaction: (t: TransactionLogic) => Promise<any> }
  ) => React.ReactNode;
};
export class FirestoreTransaction extends React.Component<
  FirestoreTranasactionProps
> {
  render() {
    const { children } = this.props;

    return (
      <FirestoreContextConsumer>
        {context => (
          <FirestoreTranasactionWithContext {...context} children={children} />
        )}
      </FirestoreContextConsumer>
    );
  }
}
