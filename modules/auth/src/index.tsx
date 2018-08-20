import * as React from "react";
import { renderAndAddProps } from "render-and-add-props";
import firebase from "firebase";
import get from "lodash.get";

import { initializeFirebaseApp } from "./initialize-firebase-app";
const e = React.createElement;
const firebaseAuthProviderDefaultProps = {
  isSignedIn: false,
  providerId: null,
  user: null,
  firebase: null
} as AuthEmission;

const {
  Provider: FirebaseAuthContextProvider,
  Consumer: FirebaseAuthContextConsumer
} = React.createContext(firebaseAuthProviderDefaultProps);

export interface InitializeAppArgs {
  authDomain: string;
  apiKey: string;
  databaseURL: string;
  firebase: typeof firebase;
  projectId: string;
  messagingSenderId?: string;
  storageBucket?: string;
}
export type FirebaseAuthProviderProps = InitializeAppArgs;

export type AuthEmission = {
  isSignedIn: boolean;
  providerId: ("none" | "google.com" | string) | null;
  user: any;
  firebase: typeof firebase | null;
};

export type FirebaseAuthProviderState = AuthEmission;

export type RenderableChildren = (authState: AuthEmission) => any;

export class FirebaseAuthProvider extends React.PureComponent<
  FirebaseAuthProviderProps,
  FirebaseAuthProviderState
> {
  stopListeningToAuth?: () => void;
  listenToAuth = () => {
    const { firebase } = this.props;
    this.stopListeningToAuth = firebase
      .app()
      .auth()
      .onAuthStateChanged(user => {
        let authEmission = null as null | AuthEmission;
        if (user === null) {
          authEmission = {
            isSignedIn: false,
            providerId: "none",
            user,
            firebase
          };
        } else if (user.isAnonymous === true) {
          authEmission = {
            isSignedIn: true,
            providerId: "anonymous",
            user,
            firebase
          };
        } else if (user.providerData && user.providerData[0]) {
          authEmission = {
            isSignedIn: true,
            providerId: get(user, "providerData.0.providerId", "unknown"),
            user,
            firebase
          };
        }
        if (authEmission !== null) {
          this.setState(() => authEmission);
        } else {
          console.warn("Something unexpected happened with ", user);
        }
      });
  };
  state = {
    isSignedIn: false,
    providerId: null,
    user: null,
    firebase: null
  };
  constructor(props: FirebaseAuthProviderProps) {
    super(props);
    initializeFirebaseApp(Object.assign({}, props));
  }
  componentDidMount() {
    this.listenToAuth();
  }

  componentWillUnmount() {
    this.stopListeningToAuth && this.stopListeningToAuth();
  }
  render() {
    const { children } = this.props;
    return e(
      FirebaseAuthContextProvider,
      { value: this.state },
      renderAndAddProps(children, {})
    );
  }
}

// export type RenderableFunction<> = () => {}

export const FirebaseAuthConsumer: React.StatelessComponent<{
  children: RenderableChildren;
}> = ({ children }) => {
  return e(FirebaseAuthContextConsumer, null, (authState: AuthEmission) =>
    renderAndAddProps(children, authState)
  );
};
export const IfFirebaseAuthed: React.StatelessComponent<{
  children: RenderableChildren;
}> = ({ children }) => {
  return e(
    FirebaseAuthContextConsumer,
    null,
    (authState: AuthEmission) =>
      authState.isSignedIn === true
        ? renderAndAddProps(children, authState)
        : null
  );
};

export type FilterAuthFunction = (authState: AuthEmission) => boolean;

export const IfFirebaseAuthedAnd: React.StatelessComponent<{
  filter: FilterAuthFunction;
  children: RenderableChildren;
}> = ({ children, filter }) => {
  return e(
    FirebaseAuthContextConsumer,
    null,
    (authState: AuthEmission) =>
      authState.isSignedIn === true
        ? filter(authState)
          ? renderAndAddProps(children, authState)
          : null
        : null
  );
};

export const IfFirebaseAuthedOr: React.StatelessComponent<{
  children: RenderableChildren;
  filter: FilterAuthFunction;
}> = ({ children, filter }) => {
  return e(
    FirebaseAuthContextConsumer,
    null,
    (authState: AuthEmission) =>
      authState.isSignedIn === true || filter(authState)
        ? renderAndAddProps(children, authState)
        : null
  );
};

export const IfFirebaseUnAuthed: React.StatelessComponent<{
  children: RenderableChildren;
}> = ({ children }) => {
  return e(
    FirebaseAuthContextConsumer,
    null,
    (authState: AuthEmission) =>
      authState.isSignedIn === false
        ? renderAndAddProps(children, authState)
        : null
  );
};

export const WithFirebase = ({
  children
}: {
  children: RenderableChildren;
}) => {
  return <FirebaseAuthContextConsumer>{children}</FirebaseAuthContextConsumer>;
};
