import * as React from "react";
import { renderAndAddProps } from "render-and-add-props";
import { initializeFirebaseApp } from "./initialize-firebase-app";
const e = React.createElement;
const firebaseAuthProviderDefaultProps = {
  isSignedIn: false,
  providerId: null,
  user: null
};

const {
  Provider: FirebaseAuthContextProvider,
  Consumer: FirebaseAuthContextConsumer
} = React.createContext(firebaseAuthProviderDefaultProps);

export class FirebaseAuthProvider extends React.PureComponent {
  listenToAuth() {
    const { firebase } = this.props;
    this.stopListeningToAuth = firebase
      .app()
      .auth()
      .onAuthStateChanged(user => {
        let authEmission = null;
        if (user === null) {
          authEmission = {
            isSignedIn: false,
            providerId: "none",
            user
          };
        } else if (user.isAnonymous === true) {
          authEmission = {
            isSignedIn: true,
            providerId: "anonymous",
            user
          };
        } else if (user.providerData && user.providerData[0]) {
          authEmission = {
            isSignedIn: true,
            providerId: user.providerData[0].providerId,
            user
          };
        }
        if (authEmission !== null) {
          this.setState(() => authEmission);
        } else {
          console.warn("Something unexpected happened with ", user);
        }
      });
  }
  constructor(props) {
    super(props);
    initializeFirebaseApp(Object.assign({}, props));
    this.state = {
      isSignedIn: false,
      providerId: null,
      user: null
    };
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

export const FirebaseAuthConsumer = ({ children }) => {
  return e(FirebaseAuthContextConsumer, null, authState =>
    renderAndAddProps(children, authState)
  );
};
export const IfFirebaseAuthed = ({ children }) => {
  return e(
    FirebaseAuthContextConsumer,
    null,
    authState =>
      authState.isSignedIn === true
        ? renderAndAddProps(children, authState)
        : null
  );
};

export const IfFirebaseAuthedAnd = ({ children, filter }) => {
  return e(
    FirebaseAuthContextConsumer,
    null,
    authState =>
      authState.isSignedIn === true
        ? filter(authState)
          ? renderAndAddProps(children, authState)
          : null
        : null
  );
};

export const IfFirebaseAuthedOr = ({ children, filter }) => {
  return e(
    FirebaseAuthContextConsumer,
    null,
    authState =>
      authState.isSignedIn === true || filter(authState)
        ? renderAndAddProps(children, authState)
        : null
  );
};

export const IfFirebaseUnAuthed = ({ children }) => {
  return e(
    FirebaseAuthContextConsumer,
    null,
    authState =>
      authState.isSignedIn === false
        ? renderAndAddProps(children, authState)
        : null
  );
};
