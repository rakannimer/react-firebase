import * as React from "react";
import { renderAndAddProps } from "render-and-add-props";
import { initializeFirebaseApp } from "../initialize-firebase-app";
import { getContext } from "../Context";
import {
  FirebaseDatabaseProviderState,
  FirebaseDatabaseProviderProps
} from "../types";
export class FirebaseDatabaseProvider extends React.Component<
  FirebaseDatabaseProviderProps,
  FirebaseDatabaseProviderState
> {
  __isMounted = true;
  constructor(props: FirebaseDatabaseProviderProps) {
    super(props);
    this.state = {
      firebase: props.firebase
    };
    if (this.props.apiKey) {
      initializeFirebaseApp(this.props);
    }
  }
  render() {
    const { children, createContext } = this.props;
    const { FirebaseDatabaseContextProvider } = getContext(createContext);
    return (
      <FirebaseDatabaseContextProvider value={this.state}>
        {renderAndAddProps(children, {})}
      </FirebaseDatabaseContextProvider>
    );
  }
}

export default FirebaseDatabaseProvider;
