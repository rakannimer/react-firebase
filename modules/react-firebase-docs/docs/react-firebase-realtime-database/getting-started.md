---
title: React Realtime Database
sidebar_label: Getting Started
---

Easily Render Firebase Realtime Database in your React or React Native app.

- [Setup](#setup)
  - [Setup @react-firebase/database](#setup-react-firebasedatabase)
- [Usage](#usage)
  - [Components](#components)
  - [Firebase Database Node](#firebase-database-node)
  - [Read data from Firebase example](#read-data-from-firebase-example)
    - [Sample Code](#sample-code)
    - [Sandbox](#sandbox)
  - [Firebase Database Mutation](#firebase-database-mutation)
    - [Sample Code](#sample-code-1)
    - [Sandbox](#sandbox-1)
  - [Firebase Database Transaction](#firebase-database-transaction)

# Setup

## Setup @react-firebase/database

If you haven't, install the [firebase](https://www.npmjs.com/package/firebase) JS client.

```bash
yarn add firebase
# Or
npm i firebase
```

Install `@react-firebase/database`

```bash
yarn add @react-firebase/database # or npm i @react-firebase/database
```

Change `PROJECT_NAME` to your project name and grab your firebase config here :

`https://console.firebase.google.com/project/PROJECT_NAME/settings/general/`

Your config file should look something like this :

```javascript
// Firebase Config
const config = {
  apiKey: "API_KEY",
  projectId: "PROJECT_ID",
  databaseURL: "DATABASE_URL",
  authDomain: "AUTH_DOMAIN",
  // OPTIONAL
  storageBucket: "STORAGE_BUCKET",
  messagingSenderId: "MESSAGING_SENDER_ID"
};
```

# Usage

## Components

- FirebaseDatabaseProvider
- FirebaseDatabaseNode
- FirebaseDatabaseMutation
- FirebaseDatabaseTransaction

Place a `FirebaseDatabaseProvider` component at the top level of your app (anywhere as long as it's above the other Realtime Database components).

```javascript
import { FirebaseDatabaseProvider } from "@react-firebase/database";
// Before
function App() {
  return (
    <div>
      This is my app <SomeOtherComponent />
    </div>
  );
}

// After
function App() {
  return (
    <FirebaseDatabaseProvider>
      <div>
        This is my app
        <SomeOtherComponent />
      </div>
    </FirebaseDatabaseProvider>
  );
}
```

If you need to authenticate to access your data, check out [`@react-firebase/auth`](https://react-firebase-js.com/docs/react-firebase-auth/getting-started)

## Firebase Database Node

Check [API](api.md) for a list of supported props.

## Read data from Firebase example

### Sample Code

```jsx
class App extends React.Component<any, AppState> {
  state = {
    limit: 2
  };
  render() {
    return (
      <div style={styles}>
        <FirebaseDatabaseProvider firebase={firebase} {...config}>
          <div>
            <FirebaseDatabaseNode
              path="user_bookmarks/"
              limitToFirst={this.state.limit}
              // orderByKey
              orderByValue={"created_on"}
            >
              {d => {
                return (
                  <React.Fragment>
                    <pre>Path {d.path}</pre>
                    <pre style={{ height: 300, overflow: "auto" }}>
                      Value {s(d.value)}
                    </pre>
                    <button
                      onClick={() => {
                        this.setState(state => ({ limit: state.limit + 2 }));
                      }}
                    >
                      Load more
                    </button>
                  </React.Fragment>
                );
              }}
            </FirebaseDatabaseNode>
          </div>
        </FirebaseDatabaseProvider>
      </div>
    );
  }
}
```

### Sandbox

<iframe src="https://codesandbox.io/embed/github/rakannimer/react-firebase/tree/master/modules/sandboxes/firebase-database-infinite-list" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Firebase Database Mutation

The `FirebaseDatabaseMutation` allows you to render components that run Firebase mutations (update, set, push).

A `setMutation` function that returns a promise is provided to the children function.

FirebaseDatabaseMutation needs 3 props :

- **path**: `string`
- **operation**: `"update" | "set" | "push"`
- **children:**

  | ( { runMutation: (value:any) => Promise<{key?:string}> } ) => ReactNode |
  | :---------------------------------------------------------------------- |


### Sample Code

```jsx
class MutationExample extends React.Component {
  state = {
    pushedKey: ""
  };
  render() {
    const { state } = this;
    return (
      <React.Fragment>
        <FirebaseDatabaseMutation type="push" path={path}>
          {({ runMutation }) => {
            return (
              <div>
                <button
                  data-testid="test-push"
                  onClick={async () => {
                    const { key } = await runMutation({ TEST: "DATA" });
                    this.setState({ pushedKey: key });
                  }}
                >
                  Push
                </button>
              </div>
            );
          }}
        </FirebaseDatabaseMutation>
        {state.pushedKey !== "" && (
          <div>
            <div data-testid="test-push-result">{state.pushedKey}</div>
            <div>
              <FirebaseDatabaseNode path={`${path}/${state.pushedKey}`}>
                {({ value }) => <pre>{s(value)}</pre>}
              </FirebaseDatabaseNode>
              <FirebaseDatabaseMutation
                type="set"
                path={`${path}/${state.pushedKey}`}
              >
                {({ runMutation }) => (
                  <button
                    onClick={async () => {
                      runMutation(null);
                      this.setState({ pushedKey: "" });
                    }}
                  >
                    Delete
                  </button>
                )}
              </FirebaseDatabaseMutation>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
```

### Sandbox

<iframe src="https://codesandbox.io/embed/5v2w2n5r9p" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Firebase Database Transaction

Suppose you have a shared counter that many can increment. To avoid race conditions, use transactions.

FirebaseDatabaseTransaction needs 2 props:

- **path**: `string`
- **children:**

  | ( { runTransaction: ({ reducer: (value:any)=>any }) => Promise<{key?:string}> } ) => ReactNode |
  | :--------------------------------------------------------------------------------------------- |


<iframe src="https://codesandbox.io/embed/github/rakannimer/react-firebase/tree/master/modules/sandboxes/firebase-database-transaction" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
