# Listen to auth

Install `@react-firebase/auth`

```bash
yarn add @react-firebase/auth # or npm i @react-firebase/auth
```

Wrap your app with a FirebaseAuthProvider and a FirebaseAuthConsumer anywhere inside its children tree.

{% code-tabs %}
{% code-tabs-item title="src/index.tsx" %}
```jsx
import * as React from "react";
import { render } from "react-dom";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer
} from "@react-firebase/auth";
import firebase from "firebase";
import { config } from "./test-credentials";
const concept = "world";

const IDontCareAboutFirebaseAuth = () => {
  return <div>This part won't react to firebase auth changes</div>;
};

const App = () => {
  return (
    <div>
      <IDontCareAboutFirebaseAuth />
      <FirebaseAuthProvider {...config} firebase={firebase}>
        <div>
          Hello <div>From Auth Provider Child 1</div>
          <FirebaseAuthConsumer>
            {({ isSignedIn }) => {
              if (isSignedIn === true) {
                return "Signed in";
              } else {
                return "Not signed in";
              }
            }}
          </FirebaseAuthConsumer>
        </div>
        <div>Another div</div>
      </FirebaseAuthProvider>
    </div>
  );
};

render(<App />, document.getElementById("root"));
```
{% endcode-tabs-item %}
{% endcode-tabs %}



