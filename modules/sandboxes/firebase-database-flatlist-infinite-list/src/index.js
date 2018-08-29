import * as React from "react";
import { render } from "react-dom";
import { View, Text, FlatList } from "react-native-web";
import * as firebase from "firebase/app";
import "firebase/database";
import {
  FirebaseDatabaseProvider,
  FirebaseDatabaseNode
} from "@react-firebase/database";
import Component from "@reach/component-component";
import { config } from "../config";

const s = v => JSON.stringify(v, null, 2);

const App = () => {
  return (
    <FirebaseDatabaseProvider firebase={firebase} {...config}>
      <View>
        <Component initialState={{ limit: 5 }}>
          {component => (
            <FirebaseDatabaseNode
              path="user_bookmarks"
              limitToFirst={component.state.limit}
            >
              {({ value }) => {
                if (value === null || typeof value === "undefined") return null;
                const keys = Object.keys(value);
                const values = Object.values(value);
                return (
                  <FlatList
                    style={{ height: 200, overflow: "auto" }}
                    data={values}
                    keyExtractor={v => keys[v.index]}
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
        <View style={{ marginTop: 10 }}>
          <Text>Oh hai</Text>
        </View>
      </View>
    </FirebaseDatabaseProvider>
  );
};
render(<App />, document.getElementById("app"));
