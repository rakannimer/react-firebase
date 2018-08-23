import * as React from "react";
import { render } from "react-dom";
import {
  FirebaseAuthProvider,
  IfFirebaseAuthed,
  IfFirebaseUnAuthed
} from "@react-firebase/auth";
import { FirebaseDatabaseMutation } from "@react-firebase/database";
import { State } from "react-powerplug";
import firebase from "firebase/app";
import { Button, MenuItem, TextField, RootRef } from "@material-ui/core";
import { config } from "./test-credentials";
import { AutoComplete } from "./AutoComplete";

const getButtonStyleProps = () => {
  return {
    variant: "contained" as any,
    style: {
      width: 200,
      height: 50,
      alignSelf: "center",
      background: "#039BE5",
      color: "white"
    }
  };
};

const getCenterChildrenStyle = () => {
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };
};

const RowWithRightAlignedContent = ({ children }) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-end"
      }}
    >
      {children}
    </div>
  );
};

const UnAuthedPage = () => {
  return (
    <State initial={{ isLoading: false, error: null }}>
      {({ state, setState }) => (
        <div
          style={{
            width: 600,
            height: 300,
            display: "flex",
            alignContent: "center",
            justifyContent: "space-around",
            flexDirection: "column"
          }}
        >
          <div>isLoading : {JSON.stringify(state.isLoading)}</div>
          <div>error : {JSON.stringify(state.error)}</div>
          <Button
            {...getButtonStyleProps()}
            onClick={async () => {
              setState({ isLoading: true, error: null });
              await firebase
                .app()
                .auth()
                .signInAnonymously();
              setState({ isLoading: false, error: null });
            }}
          >
            Login Anonymously
          </Button>
          <Button
            {...getButtonStyleProps()}
            onClick={async () => {
              try {
                setState({ isLoading: true, error: null });
                const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
                await firebase.auth().signInWithPopup(googleAuthProvider);
                // setState({ isLoading: false, error: null });
              } catch (error) {
                setState({ isLoading: false, error: error });
              }
            }}
          >
            Login With Google
          </Button>
        </div>
      )}
    </State>
  );
};

export type HeaderProps = {
  renderLogout: () => React.ReactNode;
  renderSearch: () => React.ReactNode;
};
const Header = ({
  renderLogout = () => null,
  renderSearch = () => null
}: HeaderProps) => {
  return (
    <div
      style={{
        height: 100,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <div
        style={{
          height: 200,
          width: "40%",
          alignSelf: "center",
          ...getCenterChildrenStyle()
        }}
      >
        {renderSearch()}
      </div>
      <div
        style={{
          height: 200,
          width: "30%",
          ...getCenterChildrenStyle()
        }}
      >
        {renderLogout()}
      </div>
    </div>
  );
};
const Search = () => {
  return <AutoComplete items={[]} />;
};

import get from "lodash.get";
import set from "lodash.set";

class AuthedPage extends React.Component {
  newLinkTextFieldRef = React.createRef();
  newLinkMetaTextFieldRef = React.createRef();
  render() {
    return (
      <>
        <div style={{ width: "80%" }}>
          <div style={{ width: "100%" }}>
            <Header
              renderLogout={() => (
                <Button
                  {...getButtonStyleProps()}
                  onClick={async () => {
                    await firebase
                      .app()
                      .auth()
                      .signOut();
                  }}
                >
                  Sign Out
                </Button>
              )}
              renderSearch={() => <Search />}
            />
          </div>
          <RowWithRightAlignedContent>
            <div
              style={{
                width: "30%",
                height: 300,
                maxHeight: 300,
                background: "white"
              }}
            >
              <MenuItem>Item </MenuItem>
              <MenuItem>Item</MenuItem>
              <MenuItem>Item</MenuItem>
            </div>
          </RowWithRightAlignedContent>
          <RowWithRightAlignedContent>
            <FirebaseDatabaseMutation type="push" path="user_bookmarks">
              {({ runMutation }) => (
                <form
                  style={{
                    width: "30%",
                    height: 300,
                    maxHeight: 300
                  }}
                  onSubmit={async ev => {
                    ev.preventDefault();
                    const newLink = get(
                      this.newLinkTextFieldRef,
                      "current.value",
                      ""
                    );
                    const newMeta = get(
                      this.newLinkMetaTextFieldRef,
                      "current.value",
                      ""
                    );
                    await runMutation({
                      link_url: newLink,
                      link_description: newMeta,
                      created_at: firebase.database.ServerValue.TIMESTAMP,
                      updated_at: firebase.database.ServerValue.TIMESTAMP
                    });
                    set(this.newLinkTextFieldRef, "current.value", "");
                    set(this.newLinkMetaTextFieldRef, "current.value", "");
                  }}
                >
                  <div style={{ paddingTop: 20, paddingBottom: 20 }}>
                    <div>
                      <TextField
                        label="New Link URL"
                        inputRef={this.newLinkTextFieldRef}
                      />
                    </div>
                    <div>
                      <TextField
                        label="New Link Metadata"
                        inputRef={this.newLinkMetaTextFieldRef}
                      />
                    </div>
                  </div>
                  <Button
                    style={{
                      width: 50,
                      height: 50,
                      alignSelf: "center",
                      background: "#039BE5",
                      color: "white"
                    }}
                    variant="fab"
                    type="submit"
                  >
                    +
                  </Button>
                </form>
              )}
            </FirebaseDatabaseMutation>
          </RowWithRightAlignedContent>
        </div>
      </>
    );
  }
}

const DesignedApp = () => {
  return (
    <FirebaseAuthProvider {...config} firebase={firebase}>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          background: "#ECEFF1"
        }}
      >
        <IfFirebaseUnAuthed>
          <UnAuthedPage />
        </IfFirebaseUnAuthed>
        <IfFirebaseAuthed>{() => <AuthedPage />}</IfFirebaseAuthed>
      </div>
    </FirebaseAuthProvider>
  );
};

render(<DesignedApp />, document.getElementById("root"));

const newLink = get(this.newLinkTextFieldRef, "current.value", "");
const newMeta = get(this.newLinkMetaTextFieldRef, "current.value", "");
await runMutation({
  link_url: newLink,
  link_description: newMeta,
  created_at: firebase.database.ServerValue.TIMESTAMP,
  updated_at: firebase.database.ServerValue.TIMESTAMP
});
set(this.newLinkTextFieldRef, "current.value", "");
set(this.newLinkMetaTextFieldRef, "current.value", "");
