import * as React from "react";
import { renderAndAddProps } from "render-and-add-props";

import { FirestoreContextConsumer } from "../Context";
import { FirestoreProviderState } from "../types";
import { getFirestoreRefFromPath } from "../get-firestore-query";

export type FirestoreBatchedWriteWithContextProps = FirestoreProviderState &
  FirestoreBatchedWriteProps;
export class FirestoreBatchedWriteWithContext extends React.Component<
  FirestoreBatchedWriteWithContextProps
> {
  createMutationBatch = () => {
    const { firestore } = this.props;
    let batch = firestore.batch();
    const addMutationToBatch = ({
      path,
      value,
      type
    }: {
      path: string;
      value: any;
      type: "add" | "update" | "set" | "delete";
    }) => {
      const ref = getFirestoreRefFromPath({ firestore, path });
      batch[type](ref, value);
    };
    const commit = async () => {
      await batch.commit();
      batch = firestore.batch();
    };
    return {
      addMutationToBatch,
      commit
    };
  };
  shouldComponentUpdate(nextProps: FirestoreBatchedWriteWithContextProps) {
    return nextProps.firebase !== this.props.firebase;
  }
  render() {
    const { addMutationToBatch, commit } = this.createMutationBatch();
    return renderAndAddProps(this.props.children, {
      ...this.props,
      addMutationToBatch,
      commit
    });
  }
}

export type FirestoreBatchedWriteProps = {
  type: "set" | "update" | "add";
};
export class FirestoreBatchedWrite extends React.Component<
  FirestoreBatchedWriteProps
> {
  render() {
    const { children, type } = this.props;

    return (
      <FirestoreContextConsumer>
        {context => (
          <FirestoreBatchedWriteWithContext
            type={type}
            {...context}
            children={children}
          />
        )}
      </FirestoreContextConsumer>
    );
  }
}
