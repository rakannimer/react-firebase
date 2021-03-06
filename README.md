# React Firebase

Building apps with React & Firebase should be easy. The goal of this project is to offer intuitive declarative APIs to make interacting with Firebase fun and easy.

Check the complete docs 👉 [Here](https://react-firebase-js.com)

- [React Firebase](#react-firebase)
  - [Modules](#modules)
  - [Sandboxes](#sandboxes)
    - [Auth](#auth)
      - [Anonymous/Google Auth](#anonymousgoogle-auth)
    - [Realtime Database](#realtime-database)
      - [Infinite List](#infinite-list)
      - [Mutation](#mutation)
      - [Transaction](#transaction)
    - [Auth & Database Bookmarking App Example](#auth--database-bookmarking-app-example)
    - [Server Rendered Firebase Data with NextJS Auth & Database with queries](#server-rendered-firebase-data-with-nextjs-auth--database-with-queries)
  - [Installation](#installation)
    - [Web](#web)
      - [Firebase Auth](#firebase-auth)
      - [Firebase Realtime Database](#firebase-realtime-database)

## Modules

- Firebase Realtime Database : [`@react-firebase/database`](https://react-firebase-js.com/docs/react-firebase-realtime-database/getting-started)
- Firebase Auth : [`@react-firebase/auth`](https://react-firebase-js.com/docs/react-firebase-auth/getting-started)
- Firebase Data Generator: [`generate-firebase-data`](https://react-firebase-js.com/docs/generate-firebase-data)
- Firestore Data Generator: [`generate-firestore-data`](https://react-firebase-js.com/docs/generate-firestore-data)
- Linked JSON Data Generator: [`generate-data`](https://react-firebase-js.com/docs/generate-json-data)

## Sandboxes

### Auth

#### Anonymous/Google Auth

- [Sandbox](https://codesandbox.io/s/github/rakannimer/react-firebase/tree/master/modules/sandboxes/firebase-auth)
- [Code](https://www.github.com/rakannimer/react-firebase/tree/master/modules/sandboxes/firebase-database-auth)

### Realtime Database

#### Infinite List

- [Sandbox](https://codesandbox.io/s/github/rakannimer/react-firebase/tree/master/modules/sandboxes/firebase-database-infinite-list)
- [Code](https://www.github.com/rakannimer/react-firebase/tree/master/modules/sandboxes/firebase-database-infinite-list)

#### Mutation

- [Sandbox](https://codesandbox.io/s/github/rakannimer/react-firebase/tree/master/modules/sandboxes/firebase-database-mutation)
- [Code](https://www.github.com/rakannimer/react-firebase/tree/master/modules/sandboxes/firebase-database-mutation)

#### Transaction

- [Sandbox](https://codesandbox.io/s/github/rakannimer/react-firebase/tree/master/modules/sandboxes/firebase-database-transaction)
- [Code](https://www.github.com/rakannimer/react-firebase/tree/master/modules/sandboxes/firebase-database-transaction)

### Auth & Database Bookmarking App Example

- [Sandbox](https://codesandbox.io/s/github/rakannimer/react-firebase/tree/master/modules/tutorial-bookmarking-app)
- [Code](https://www.github.com/rakannimer/react-firebase/tree/master/modules/tutorial-bookmarking-app)

### Server Rendered Firebase Data with NextJS Auth & Database with queries

- [Demo](https://things-ive-built.com)
- [Code](https://www.github.com/rakannimer/things-ive-built)

## Installation

### Web

Install [firebase](https://www.npmjs.com/package/firebase).

```bash
yarn add firebase
# Or
npm i firebase
```

#### Firebase Auth

```bash
yarn add @react-firebase/auth
```

#### Firebase Realtime Database

```bash
yarn add @react-firebase/database
```
