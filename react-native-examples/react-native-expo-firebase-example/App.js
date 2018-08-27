import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight
} from "react-native";

import firebase from "firebase/app";
import 'firebase/auth'
// const firebase = {};
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer
} from "@react-firebase/auth";
import {config} from './test-credentials'
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      // firebase things?
    };
  }

  componentDidMount() {
    // firebase things?
  }

  render() {
    return (
      <FirebaseAuthProvider firebase={firebase} {...config}>
        <ScrollView style={{ marginTop: 50 }}>
          <View style={styles.container}>
            <TouchableHighlight
              onPress={async () => {
                const data = await firebase
                  .auth()
                  .signInAnonymously();
                console.warn(data);
              }}
            >
              <Text>Sign In Anonymously</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => {
                firebase.auth().signOut();
              }}
            >
              <Text>Sign Out</Text>
            </TouchableHighlight>
            <FirebaseAuthConsumer>
              {({ isSignedIn, user, providerId }) => {
                return (
                  <ScrollView style={{ height: 300 }}>
                    <Text>
                      {JSON.stringify(
                        { isSignedIn, user, providerId },
                        null,
                        2
                      )}
                    </Text>
                  </ScrollView>
                );
              }}
            </FirebaseAuthConsumer>
          </View>
        </ScrollView>
      </FirebaseAuthProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  logo: {
    height: 120,
    marginBottom: 16,
    marginTop: 32,
    width: 120
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  modules: {
    margin: 20
  },
  modulesHeader: {
    fontSize: 16,
    marginBottom: 8
  },
  module: {
    fontSize: 14,
    marginTop: 4,
    textAlign: "center"
  }
});
