---
title: React Realtime Database
sidebar_label: API
---

- [FirestoreProvider Props](#firestoreprovider-props)
- [Firestore Setup Reference](#firestore-setup-reference)
- [FirestoreCollection](#firestorecollection)
- [Firestore Query Reference](#firestore-query-reference)
- [FirestoreDocument](#firestoredocument)
- [Firestore Query Reference](#firestore-query-reference)
- [FirestoreMutation Props​ {#firebasedatabasemutation-props}](#firestoremutation-props%E2%80%8B-firebasedatabasemutation-props)
- [​Firestore Write Data Reference​ {#firebase-write-data-reference}](#%E2%80%8Bfirestore-write-data-reference%E2%80%8B-firebase-write-data-reference)



## FirestoreProvider Props

| Name              | Type                                               | Required | Default |
| :---------------- | :------------------------------------------------- | :------- | :------ |
| firebase          | [firebase](https://www.npmjs.com/package/firebase) | yes      |         |
| authDomain        | string                                             | yes      |         |
| apiKey            | string                                             | yes      |         |
| databaseURL       | string                                             | yes      |         |
| projectId         | string                                             | yes      |         |
| messagingSenderId | string                                             | no       |         |
| storageBucket     | string                                             | no       |         |
| children          | React Node                                         | no       |         |
| render            | \(\) =&gt; ReactNode                               | no       |         |

## [Firestore Setup Reference](https://firebase.google.com/docs/firestore/quickstart)

## FirestoreCollection

| Name               | Type                                                               | Required | Default   |
| :----------------- | :----------------------------------------------------------------- | :------- | :-------- |
| path               | string                                                             | yes      | null      |
| **where**          | {}                                                                 | no       | null      |
| **where**.field    | string                                                             | no       | undefined |
| **where**.operator | "&lt;" \| "&lt;=" \| "==" \| "&gt;" \| "&gt;=" \| "array-contains" | no       | undefined |
| **where**.value    | any                                                                | no       | undefined |
| orderBy            | { field: string; type?: "desc" \| "asc" }\[\]                      | no       | null      |
| limit              | number                                                             | no       | null      |
| startAt            | PrimitiveType \| PrimitiveType\[\] \| DocumentSnapshot             | no       | null      |
| endAt              | PrimitiveType \| DocumentSnapshot                                  | no       | null      |
| startAfter         | PrimitiveType \| DocumentSnapshot                                  | no       | null      |
| endBefore          | PrimitiveType \| DocumentSnapshot                                  | no       | null      |

## [Firestore Query Reference](https://firebase.google.com/docs/firestore/query-data/get-data)

## FirestoreDocument

Same props as FirestoreCollection 

| Name               | Type                                                               | Required | Default   |
| :----------------- | :----------------------------------------------------------------- | :------- | :-------- |
| path               | string                                                             | yes      | null      |
| **where**          | {}                                                                 | no       | null      |
| **where**.field    | string                                                             | no       | undefined |
| **where**.operator | "&lt;" \| "&lt;=" \| "==" \| "&gt;" \| "&gt;=" \| "array-contains" | no       | undefined |
| **where**.value    | any                                                                | no       | undefined |
| orderBy            | { field: string; type?: "desc" \| "asc" }\[\]                      | no       | null      |
| limit              | number                                                             | no       | null      |
| startAt            | PrimitiveType \| PrimitiveType\[\] \| DocumentSnapshot             | no       | null      |
| endAt              | PrimitiveType \| DocumentSnapshot                                  | no       | null      |
| startAfter         | PrimitiveType \| DocumentSnapshot                                  | no       | null      |
| endBefore          | PrimitiveType \| DocumentSnapshot                                  | no       | null      |

## [Firestore Query Reference](https://firebase.google.com/docs/firestore/query-data/get-data)

## FirestoreMutation Props​ {#firebasedatabasemutation-props}

| Name     | Type                                                                                                  | Required | Default |
| :------- | :---------------------------------------------------------------------------------------------------- | :------- | :------ |
| path     | string                                                                                                | yes      | ​       |
| type     | "set" \| "update" \| "add"                                                                            | yes      | ​       |
| children | \( { runMutation: \(value:any, options?:any\) =&gt; Promise&lt;{key?:string}&gt; } \) =&gt; ReactNode | yes      | null    |

## [​Firestore Write Data Reference​](https://firebase.google.com/docs/firestore/manage-data/add-data) {#firebase-write-data-reference}



