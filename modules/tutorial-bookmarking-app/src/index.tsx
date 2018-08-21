import * as React from "react";
import { render } from "react-dom";
import {
  FirebaseAuthProvider,
  IfFirebaseAuthed,
  IfFirebaseUnAuthed
} from "@react-firebase/auth";
import { State } from "react-powerplug";
import firebase from "firebase/app";
import { config } from "./test-credentials";

const IDontCareAboutFirebaseAuth = () => {
  return <div>This part won't react to firebase auth changes</div>;
};

const App = () => {
  return (
    <div>
      <IDontCareAboutFirebaseAuth />
      <FirebaseAuthProvider {...config} firebase={firebase}>
        <State initial={{ isLoading: false, error: null }}>
          {({ state, setState }) => (
            <React.Fragment>
              <div>isLoading : {JSON.stringify(state.isLoading)}</div>
              <div>error : {JSON.stringify(state.error)}</div>
              <IfFirebaseAuthed>
                {({ firebase }) => {
                  return (
                    <div>
                      <h2>You're signed in 🎉 </h2>
                      <button
                        onClick={async () => {
                          setState({ isLoading: true });
                          await firebase
                            .app()
                            .auth()
                            .signOut();
                          setState({ isLoading: false });
                        }}
                      >
                        Sign out
                      </button>
                      <State initial={{ newLinkUrl: "", newLinkMetadata: "" }}>
                        {({ state, setState }) => {
                          return (
                            <div>
                              <h2>New Link Url</h2>
                              <input
                                type="text"
                                value={state.newLinkUrl}
                                onChange={ev => {
                                  setState({ newLinkUrl: ev.target.value });
                                }}
                              />
                              <h2>New Link Metadata</h2>
                              <input
                                type="text"
                                value={state.newLinkMetadata}
                                onChange={ev => {
                                  setState({
                                    newLinkMetadata: ev.target.value
                                  });
                                }}
                              />
                              <div>
                                <button
                                  onClick={() => {
                                    console.log(state);
                                    const {
                                      newLinkUrl,
                                      newLinkMetadata
                                    } = state;
                                  }}
                                >
                                  Submit
                                </button>
                              </div>
                            </div>
                          );
                        }}
                      </State>
                    </div>
                  );
                }}
              </IfFirebaseAuthed>
              <IfFirebaseUnAuthed>
                <div>
                  <h2>You're not signed in </h2>
                  <button
                    onClick={async () => {
                      setState({ isLoading: true, error: null });
                      await firebase
                        .app()
                        .auth()
                        .signInAnonymously();
                      setState({ isLoading: false, error: null });
                    }}
                  >
                    Sign in anonymously
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        setState({ isLoading: true, error: null });
                        const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
                        await firebase
                          .auth()
                          .signInWithPopup(googleAuthProvider);
                        setState({ isLoading: false, error: null });
                      } catch (error) {
                        setState({ isLoading: false, error: error });
                      }
                    }}
                  >
                    Sign in with Google
                  </button>
                </div>
              </IfFirebaseUnAuthed>
            </React.Fragment>
          )}
        </State>
      </FirebaseAuthProvider>
    </div>
  );
};

render(<App />, document.getElementById("root"));
