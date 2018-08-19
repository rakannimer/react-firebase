---
description: Setup React binding for firebase realtime database.
---

# Setup

#### Setup @react-firebase/database 

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

#### 



