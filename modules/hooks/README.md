## React hooks for interacting with your Firebase database

React Firebase Hooks for React & React Native

## Install

```sh
  yarn add @react-firebase/hooks
```

## Usage

```jsx
import { FirebaseProvider, useDatabase } from "@react-firebase/hooks";

function UserBookmarks() {
  const { isLoading, value, ref } = useDatabase({
    path: "user_bookmarks/",
    limitToFirst: 2
  });
  return <pre>{JSON.stringify({ isLoading, value }, null, 2)}</pre>;
}

function App() {
  return (
    <FirebaseProvider firebase={firebase} {...config}>
      <UserBookmarks />
    </FirebaseProvider>
  );
}
```
