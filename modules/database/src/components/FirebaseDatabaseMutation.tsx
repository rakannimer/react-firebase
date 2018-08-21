import * as React from "react";
import { renderAndAddProps } from "render-and-add-props";

import { FirebaseDatabaseContextConsumer } from "../Context";
import { FirebaseQuery, FirebaseDatabaseProviderState } from "../types";
export { FirebaseDatabaseProvider } from "./FirebaseDatabaseProvider";
import { FirebaseDatabaseContextConsumerLifeCycle } from "./FirebaseDatabaseContextConsumerLifeCycle";

export type Nullable<T> = T | null;

export type FirebaseMutationProps = {
  path: string;
  value: any;
  type: "set" | "update" | "push";
};

export type FirebaseMutationState = {
  runMutation: Nullable<RunMutation>;
  isLoading: boolean;
  result: {
    path: Nullable<FirebaseMutationProps["path"]>;
    value: Nullable<FirebaseMutationProps["value"]>;
    type: Nullable<FirebaseMutationProps["type"]>;
  };
};

export type FirebaseDatabaseMutationWithContextProps = FirebaseMutationProps &
  FirebaseDatabaseProviderState;

export type RunMutation = () => Promise<{
  path: FirebaseMutationProps["path"];
  value: FirebaseMutationProps["value"];
  type: FirebaseMutationProps["type"];
  key?: Nullable<string>;
}>;

export class FirebaseDatabaseMutationWithContext extends React.Component<
  FirebaseDatabaseMutationWithContextProps,
  FirebaseMutationState
> {
  state = {
    runMutation: null,
    isLoading: true,
    result: {
      path: null,
      value: null,
      type: null
    }
  };
  createMutationRunner = () => {
    const { firebase, path, value, type } = this.props;
    const firebaseRef = firebase
      .app()
      .database()
      .ref(path);
    let runMutation: RunMutation;
    switch (type) {
      case "push": {
        runMutation = async () => {
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
        runMutation = async () => {
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
        runMutation = async () => {
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
  async componentDidMount() {
    await this.createMutationRunner();
  }

  async componentDidUpdate(
    prevProps: FirebaseDatabaseMutationWithContextProps
  ) {
    if (
      prevProps.path !== this.props.path ||
      prevProps.value !== this.props.value
    ) {
      await this.createMutationRunner();
    }
  }
  shouldComponentUpdate(nextProps: FirebaseDatabaseMutationWithContextProps) {
    return (
      nextProps.path !== this.props.path ||
      nextProps.value !== this.props.value ||
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
    const { children, type, path, value } = this.props;
    return (
      <FirebaseDatabaseContextConsumer>
        {context => (
          <FirebaseDatabaseMutationWithContext
            type={type}
            path={path}
            value={value}
            {...context}
            children={children}
          />
        )}
      </FirebaseDatabaseContextConsumer>
    );
  }
}
