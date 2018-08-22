import * as React from "react";
import { renderAndAddProps } from "render-and-add-props";

import { FirestoreContextConsumer } from "../Context";
import { FirestoreProviderState } from "../types";
import { getFirestoreRefFromPath } from "../get-firestore-query";

export type FirestoreBatchedWriteWithContextProps = FirestoreProviderState;
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
      //@ts-ignore
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

export type ChildrenArgs = {
  addMutationToBatch: (
    {
      path,
      value,
      type
    }: {
      path: string;
      value: any;
      type: "add" | "update" | "set" | "delete";
    }
  ) => void;
  commit: () => Promise<void>;
};

export class FirestoreBatchedWrite extends React.Component<{
  children: ({ addMutationToBatch, commit }: ChildrenArgs) => React.ReactNode;
}> {
  render() {
    const { children } = this.props;

    return (
      <FirestoreContextConsumer>
        {context => (
          <FirestoreBatchedWriteWithContext {...context} children={children} />
        )}
      </FirestoreContextConsumer>
    );
  }
}
