import * as React from "react";
import { renderAndAddProps } from "render-and-add-props";

import { initializeFirebaseApp } from "../initialize-firebase-app";
import { FirestoreContextProvider } from "../Context";
import { getFirestoreQuery } from "../get-firestore-query";
import { stateReducer } from "../state-reducer";

import {
  FirestoreQuery,
  FirestoreProviderState,
  FirestoreProviderProps
} from "../types";
import { CollectionReference } from "@google-cloud/firestore";

export class FirestoreProvider extends React.Component<
  FirestoreProviderProps,
  FirestoreProviderState
> {
  listenTo = async (
    firestoreQuery: FirestoreQuery,
    documentOrCollection: "document" | "collection" = "document"
  ) => {
    const { path } = firestoreQuery;
    if (path === null) {
      return;
    }
    if (path in this.state.dataTree) {
      console.log("Path already in datatree", this.state.dataTree[path]);
      this.state.dataTree[path].unsub();
      // this.setState(state => stateReducer(state, { path }, "delete"));
    }
    let onNext = (
      snapshot:
        | FirebaseFirestore.QuerySnapshot
        | FirebaseFirestore.QueryDocumentSnapshot
        | FirebaseFirestore.CollectionReference
    ) => {
      if (documentOrCollection === "document") {
        let docSnapshot = snapshot as FirebaseFirestore.QueryDocumentSnapshot;
        this.setState(state => {
          return stateReducer(
            state,
            {
              path,
              value: docSnapshot.exists ? docSnapshot.data() : null,
              documentOrCollection,
              snapshot,
              unsub,
              isLoading: false
            },
            "add"
          );
        });
      } else {
        let collectionSnapshot = snapshot as FirebaseFirestore.QuerySnapshot;
        collectionSnapshot.docs.forEach(docSnapshot => {
          this.setState(state => {
            return stateReducer(
              state,
              {
                path: `${path}`,
                value: docSnapshot.exists ? docSnapshot.data() : null,
                documentOrCollection,
                snapshot: docSnapshot,
                unsub,
                isLoading: false
              },
              "add"
            );
          });
        });
        return;
      }
    };
    let onError = (err: Error) => {
      this.setState(state => {
        console.error(err);
        return stateReducer(
          state,
          {
            unsub: () => {},
            documentOrCollection,
            value: null,
            path,
            isLoading: false
          },
          "add"
        );
      });
    };
    const ref = getFirestoreQuery(
      Object.assign({}, firestoreQuery, { firestore: this.state.firestore })
    ) as CollectionReference;
    let unsub = ref.onSnapshot(onNext, onError);
  };
  stopListeningTo(path: string) {
    if (!(path in this.state.dataTree)) {
      return;
    }
    this.state.dataTree[path].unsub();
    this.setState(state => stateReducer(state, { path }, "delete"));
  }
  constructor(props: FirestoreProviderProps) {
    super(props);
    initializeFirebaseApp(props);
    const firestore = props.firebase.firestore();
    const settings = { timestampsInSnapshots: true };
    firestore.settings(settings);
    this.state = {
      firebase: props.firebase,
      firestore: props.firebase.app().firestore(),
      dataTree: {},
      listenTo: this.listenTo.bind(this),
      stopListeningTo: this.stopListeningTo.bind(this)
    };
  }
  componentWillUnmount() {
    const { dataTree } = this.state;
    Object.keys(dataTree).forEach(
      key => dataTree[key].unsub && dataTree[key].unsub()
    );
  }
  render() {
    const { children } = this.props;
    return (
      <FirestoreContextProvider value={this.state}>
        {renderAndAddProps(children, {})}
      </FirestoreContextProvider>
    );
  }
}
