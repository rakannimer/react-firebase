import * as React from "react";
import * as firebase from "firebase/app";
import "firebase/database";
import { Toggle } from "react-powerplug";
//@ts-ignore
import { View, Text, FlatList } from "react-native-web";
//@ts-ignore
import Component from "@reach/component-component";

import { config } from "./test-credentials";

import {
  FirebaseDatabaseNode,
  FirebaseDatabaseProvider,
  FirebaseDatabaseNodes
} from "../index";
import { FirebaseDatabaseMutation } from "../components/FirebaseDatabaseMutation";
import { FirebaseDatabaseTransaction } from "../components/FirebaseDatabaseTransaction";
import ReactJson from "react-json-view";

const s = (v: any) => JSON.stringify(v, null, 2);

const StateComponentAsAny = Component as any;
export const FirebaseDatabaseList = () => (
  <div>
    <StateComponentAsAny initial={{ limit: 2 }}>
      {({ state, setState }: any) => (
        <FirebaseDatabaseNode
          path="user_bookmarks/"
          limitToFirst={state.limit}
          orderByValue={"created_on"}
        >
          {d => {
            return (
              <>
                <pre>Path {d.path}</pre>
                <pre style={{ height: 300, overflow: "auto" }}>
                  Value {JSON.stringify(d.value, null, 2)}
                </pre>
                <button
                  onClick={() => {
                    setState({ limit: state.limit + 1 });
                  }}
                >
                  Load more
                </button>
              </>
            );
          }}
        </FirebaseDatabaseNode>
      )}
    </StateComponentAsAny>
  </div>
);

export const FirebaseDatabaseItem = () => (
  <div>
    <FirebaseDatabaseNode path="user_bookmarks/a">
      {d => {
        return <ReactJson src={d} />;
      }}
    </FirebaseDatabaseNode>
  </div>
);

export const TransactionExample = () => (
  <FirebaseDatabaseTransaction path="user_bookmarks/a/usage_count">
    {({ runTransaction }) => {
      return (
        <div>
          <button
            onClick={() => {
              runTransaction({
                reducer: val => {
                  if (val === null) {
                    return 1;
                  } else {
                    return val + 1;
                  }
                }
              }).then(() => {
                console.log("Ran transaction");
              });
            }}
          >
            Click me to run transaction
          </button>
        </div>
      );
    }}
  </FirebaseDatabaseTransaction>
);

export const MutationExample = () => (
  <div>
    <FirebaseDatabaseMutation type="set" path="user_bookmarks/a">
      {({ runMutation }) => {
        return (
          <div>
            <button
              onClick={() => {
                runMutation({
                  new_data: "Oh hai",
                  updated_at: firebase.database.ServerValue.TIMESTAMP,
                  now: Date.now()
                }).then(() => {
                  console.log("Ran mutation");
                });
              }}
            >
              Click me to run mutation
            </button>
          </div>
        );
      }}
    </FirebaseDatabaseMutation>
  </div>
);

export const FirebaseTwoNodesSameLevelSamePath = () => {
  return (
    <React.Fragment>
      <FirebaseDatabaseNode path="user_bookmarks/a">
        {d => {
          return <ReactJson src={d} />;
        }}
      </FirebaseDatabaseNode>
      <div>
        <FirebaseDatabaseNode path="user_bookmarks/a">
          {d => {
            return <ReactJson src={d} />;
          }}
        </FirebaseDatabaseNode>
      </div>
    </React.Fragment>
  );
};

export const InfiniteList = () => (
  <View>
    <Component initialState={{ limit: 5 }}>
      {(component: any) => (
        <FirebaseDatabaseNode
          path="user_bookmarks"
          limitToFirst={component.state.limit}
          keysOnly
          once
        >
          {({ value }) => {
            if (value === null || typeof value === "undefined") return null;
            const keys = Object.keys(value);
            const values = Object.values(value);
            return (
              <FlatList
                style={{ height: 200, overflow: "auto" }}
                data={values}
                //@ts-ignore
                keyExtractor={(v, i) => keys[i]}
                //@ts-ignore
                renderItem={v => (
                  <View>
                    <Text>{s(v)}</Text>
                  </View>
                )}
                onEndReached={() => {
                  component.setState({ limit: component.state.limit + 1 });
                }}
              />
            );
          }}
        </FirebaseDatabaseNode>
      )}
    </Component>
  </View>
);

export const App = () => {
  return (
    <Toggle initial={true}>
      {({ on, toggle }) => (
        <React.Fragment>
          {on ? (
            <FirebaseDatabaseProvider firebase={firebase} {...config}>
              <FirebaseDatabaseNodes
                nodes={[
                  {
                    path: `user_bookmarks/a`,
                    id: "user_bookmark"
                  },
                  {
                    path: `user_bookmarks/`,
                    id: "user_bookmarks",
                    query: {
                      limitToFirst: 2,
                      keysOnly: true
                    }
                  }
                ]}
              >
                {({ isLoading, value }) => {
                  const { user_bookmark, user_bookmarks } = value;
                  return (
                    <div>
                      <pre>
                        {JSON.stringify(
                          { isLoading, value, user_bookmark, user_bookmarks },
                          null,
                          2
                        )}
                      </pre>
                    </div>
                  );
                }}
              </FirebaseDatabaseNodes>
              {/* <FirebaseDatabaseItem />
              <TransactionExample />
              <MutationExample />
              <Toggle initial={true}>
                {({ on, toggle }) => (
                  <React.Fragment>
                    <InfiniteList />
                    {on && (
                      <FirebaseDatabaseNode
                        path="user_bookmarks/"
                        limitToFirst={5}
                        keysOnly
                      >
                        {d => {
                          return <ReactJson src={d} />;
                        }}
                      </FirebaseDatabaseNode>
                    )}
                    <button onClick={toggle}>Toggle Node</button>
                  </React.Fragment>
                )}
              </Toggle> */}
            </FirebaseDatabaseProvider>
          ) : (
            <div> Nothing to se</div>
          )}
          <button onClick={toggle}>Toggle Provider</button>
        </React.Fragment>
      )}
    </Toggle>
  );
};
