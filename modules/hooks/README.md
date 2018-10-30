## React hooks for interacting with your Firebase database

## Install

```sh
  yarn add @react-firebase/hooks
```

## Usage

```jsx
import { FirebaseProvider, useFirebaseRealtimeDatabase } from "sum";

function UserBookmarks() {
  const { isLoading, value, ref } = useFirebase({
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
