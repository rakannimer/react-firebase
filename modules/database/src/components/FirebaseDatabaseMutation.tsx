import * as React from "react";
import { renderAndAddProps } from "render-and-add-props";

import { FirebaseDatabaseContextConsumer } from "../Context";
import { FirebaseDatabaseProviderState } from "../types";
export { FirebaseDatabaseProvider } from "./FirebaseDatabaseProvider";

export type Nullable<T> = T | null;

export type FirebaseMutationProps = {
  path: string;
  type: "set" | "update" | "push";
  children: ({ runMutation }: { runMutation: RunMutation }) => React.ReactNode;
};

export type FirebaseDatabaseMutationWithContextProps = FirebaseMutationProps &
  FirebaseDatabaseProviderState;

export type RunMutation = (
  value: any
) => Promise<{
  path: FirebaseMutationProps["path"];
  value: any;
  type: FirebaseMutationProps["type"];
  key?: Nullable<string>;
}>;

export class FirebaseDatabaseMutationWithContext extends React.Component<
  FirebaseDatabaseMutationWithContextProps
> {
  createMutationRunner = () => {
    const { firebase, path, type } = this.props;
    const firebaseRef = firebase
      .app()
      .database()
      .ref(path);
    let runMutation: RunMutation;
    switch (type) {
      case "push": {
        runMutation = async value => {
          const key = await firebaseRef.push(value).key;
          return {
            path,
            value,
            type,
            key
          };
        };
        break;
      }
      case "update": {
        runMutation = async value => {
          await firebaseRef.update(value);
          return {
            path,
            value,
            type,
            key: null
          };
        };

        break;
      }
      case "set": {
        runMutation = async value => {
          await firebaseRef.set(value);
          return {
            path,
            value,
            type,
            key: null
          };
        };
        break;
      }
      default: {
        throw new Error(
          `Unsupported mutation type ${type}. \nPlease file an issue if you'd like to see us support it !`
        );
      }
    }
    return runMutation;
  };
  shouldComponentUpdate(nextProps: FirebaseDatabaseMutationWithContextProps) {
    return (
      nextProps.path !== this.props.path ||
      nextProps.firebase !== this.props.firebase
    );
  }
  render() {
    const { children } = this.props;
    const runMutation = this.createMutationRunner();
    return renderAndAddProps(children, { runMutation, ...this.props });
  }
}

export class FirebaseDatabaseMutation extends React.Component<
  FirebaseMutationProps
> {
  render() {
    const { children, type, path } = this.props;
    return (
      <FirebaseDatabaseContextConsumer>
        {context => (
          <FirebaseDatabaseMutationWithContext
            type={type}
            path={path}
            {...context}
            children={children}
          />
        )}
      </FirebaseDatabaseContextConsumer>
    );
  }
}
