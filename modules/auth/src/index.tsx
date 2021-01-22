import * as React from "react";
import { renderAndAddProps } from "render-and-add-props";
import get from "lodash/get";
import { initializeFirebaseApp } from "./initialize-firebase-app";
import {
  AuthEmission,
  FirebaseAuthProviderProps,
  FirebaseAuthProviderState,
  RenderableChildren
} from "./types";

const firebaseAuthProviderDefaultProps = {
  isSignedIn: false,
  providerId: null,
  user: null,
  firebase: {}
} as AuthEmission;

const {
  Provider: FirebaseAuthContextProvider,
  Consumer: FirebaseAuthContextConsumer
} = React.createContext(firebaseAuthProviderDefaultProps);

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
      .onAuthStateChanged((user: any) => {
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
          console.error("Something unexpected happened with ", user);
        }
      });
  };
  state = {
    isSignedIn: !!this.props.firebase.auth().currentUser,
    providerId: null,
    user: this.props.firebase.auth().currentUser,
    firebase: {}
  };
  constructor(props: FirebaseAuthProviderProps) {
    super(props);
    if (props.apiKey) {
      initializeFirebaseApp(Object.assign({}, props));
    }
  }
  componentDidMount() {
    this.listenToAuth();
  }

  componentWillUnmount() {
    this.stopListeningToAuth && this.stopListeningToAuth();
  }
  render() {
    const { children } = this.props;
    return (
      <FirebaseAuthContextProvider value={this.state}>
        {renderAndAddProps(children, {})}
      </FirebaseAuthContextProvider>
    );
  }
}

// export type RenderableFunction<> = () => {}

export const FirebaseAuthConsumer: React.StatelessComponent<{
  children: RenderableChildren;
}> = ({ children }) => {
  return (
    <FirebaseAuthContextConsumer>
      {(authState: AuthEmission) => renderAndAddProps(children, authState)}
    </FirebaseAuthContextConsumer>
  );
};
export const IfFirebaseAuthed: React.StatelessComponent<{
  children: RenderableChildren;
}> = ({ children }) => {
  return (
    <FirebaseAuthContextConsumer>
      {(authState: AuthEmission) =>
        authState.isSignedIn === true
          ? renderAndAddProps(children, authState)
          : null
      }
    </FirebaseAuthContextConsumer>
  );
};

export type FilterAuthFunction = (authState: AuthEmission) => boolean;

export const IfFirebaseAuthedAnd: React.StatelessComponent<{
  filter: FilterAuthFunction;
  children: RenderableChildren;
}> = ({ children, filter }) => {
  return (
    <FirebaseAuthContextConsumer>
      {(authState: AuthEmission) =>
        authState.isSignedIn === true
          ? filter(authState)
            ? renderAndAddProps(children, authState)
            : null
          : null
      }
    </FirebaseAuthContextConsumer>
  );
};

export const IfFirebaseAuthedOr: React.StatelessComponent<{
  children: RenderableChildren;
  filter: FilterAuthFunction;
}> = ({ children, filter }) => {
  return (
    <FirebaseAuthContextConsumer>
      {(authState: AuthEmission) =>
        authState.isSignedIn === true || filter(authState)
          ? renderAndAddProps(children, authState)
          : null
      }
    </FirebaseAuthContextConsumer>
  );
};

export const IfFirebaseUnAuthed: React.StatelessComponent<{
  children: RenderableChildren;
}> = ({ children }) => {
  return (
    <FirebaseAuthContextConsumer>
      {(authState: AuthEmission) =>
        authState.isSignedIn === false
          ? renderAndAddProps(children, authState)
          : null
      }
    </FirebaseAuthContextConsumer>
  );
};

export const WithFirebase = ({
  children
}: {
  children: RenderableChildren;
}) => {
  return <FirebaseAuthContextConsumer>{children}</FirebaseAuthContextConsumer>;
};
