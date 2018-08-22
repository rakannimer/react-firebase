import * as React from "react";
import { renderAndAddProps } from "render-and-add-props";

import { FirestoreContextConsumer } from "../Context";
import { FirestoreQuery, FirestoreProviderState } from "../types";
import { getFirestoreQuery } from "../get-firestore-query";
import {
  DocumentReference,
  CollectionReference
} from "@google-cloud/firestore";

export type FirestoreMutationWithContextProps = FirestoreQuery &
  FirestoreProviderState &
  FirestoreMutationProps;
export class FirestoreMutationWithContext extends React.Component<
  FirestoreMutationWithContextProps
> {
  createMutationRunner = () => {
    const { type, path } = this.props;
    const docReference = getFirestoreQuery(this.props) as DocumentReference;
    switch (type) {
      case "set": {
        const runMutation = async (value: any, options = { merge: true }) => {
          return await docReference.set(value, options);
        };
        return runMutation;
      }
      case "update": {
        const runMutation = async (value: any) => {
          return await docReference.update(value).then(val => ({
            response: val,
            path,
            value,
            type,
            key: null
          }));
        };
        return runMutation;
      }
      case "add": {
        const runMutation = async (value: any) => {
          let collectionRef = getFirestoreQuery(
            this.props
          ) as CollectionReference;
          let newDocRef = collectionRef.doc();
          return await newDocRef.set(value).then(val => ({
            response: val,
            path,
            value,
            type,
            key: newDocRef.id
          }));
        };
        return runMutation;
      }

      default: {
        throw new Error(
          `Unsupported mutation type ${type}. \nPlease file an issue if you'd like to see us support it !`
        );
      }
    }
  };
  shouldComponentUpdate(nextProps: FirestoreMutationWithContextProps) {
    return (
      nextProps.path !== this.props.path ||
      nextProps.firebase !== this.props.firebase
    );
  }
  render() {
    const runMutation = this.createMutationRunner();
    return renderAndAddProps(this.props.children, {
      ...this.props,
      runMutation
    });
  }
}

export type FirestoreMutationProps = {
  type: "set" | "update" | "add";
};
export class FirestoreMutation extends React.Component<
  FirestoreQuery & FirestoreMutationProps
> {
  render() {
    const { children, path, type } = this.props;
    if (path === null) {
      console.warn("path not provided to FirestoreNode ! Not rendering.");
      return null;
    }
    return (
      <FirestoreContextConsumer>
        {context => (
          <FirestoreMutationWithContext
            type={type}
            path={path}
            {...context}
            children={children}
          />
        )}
      </FirestoreContextConsumer>
    );
  }
}
