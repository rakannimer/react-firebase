// import * as React from "react";
// import {
//   render,
//   cleanup,
//   getNodeText,
//   waitForElement,
//   fireEvent
// } from "react-testing-library";
// import * as firebase from "firebase/app";
// import {
//   FirestoreProvider,
//   FirestoreDocument,
//   FirestoreTransaction,
//   FirestoreMutation
// } from "../src/";
// import { config } from "../src/demo/test-credentials";
// import { initializeFirebaseApp } from "../src/initialize-firebase-app";

test(
  "FirestoreTransaction (beta)",
  async () => {
    //     const path = "user_bookmarks/test";
    //     const value = { test: "data" };
    //     const { getByText, getByTestId } = render(
    //       <FirestoreProvider firebase={firebase} {...config}>
    //         <FirestoreTransaction>
    //           {({ runTransaction }) => {
    //             return (
    //               <div>
    //                 <button
    //                   data-testid="test-set"
    //                   onClick={async () => {
    //                     await runTransaction(
    //                       async ({ transaction, get, set, fDelete, update }) => {
    //                         const res = await get({
    //                           path
    //                         });
    //                         const data = res.data();
    //                         console.warn(data);
    //                         await update(path, {
    //                           ...data,
    //                           a: data.a ? 1 : data.a + 1
    //                         });
    //                         // fDelete(`${path}`);
    //                       }
    //                     );
    //                   }}
    //                 >
    //                   runTransaction
    //                 </button>
    //               </div>
    //             );
    //           }}
    //         </FirestoreTransaction>
    //         <FirestoreDocument path={`${path}/a`}>
    //           {value => {
    //             return (
    //               <div>
    //                 {value.value &&
    //                   value.value !== null && (
    //                     <div data-testid="test-value">
    //                       {JSON.stringify(value.value)}
    //                     </div>
    //                   )}
    //                 {value.path && <div data-testid="test-path">{value.path}</div>}
    //                 <div data-testid="test-is-loading">{value.isLoading}</div>
    //               </div>
    //             );
    //           }}
    //         </FirestoreDocument>
    //       </FirestoreProvider>
    //     );
    //     // await waitForElement(() => getByTestId("test-set-init"));
    //     // fireEvent.click(getByTestId("test-set-init"));
    //     await waitForElement(() => getByTestId("test-set"));
    //     fireEvent.click(getByTestId("test-set"));
    //     const [testValueEl, testPathEl] = await Promise.all([
    //       waitForElement(() => getByTestId("test-value"), { timeout: 10000 }),
    //       waitForElement(() => getByTestId("test-path")),
    //       waitForElement(() => getByTestId("test-is-loading"))
    //     ]);
    //     // console.log("VALUE  ", getNodeText(testValueEl));
    //     const v = JSON.parse(getNodeText(testValueEl));
    //     console.warn(v);
    //     expect(v).toEqual(1);
    //     expect(getNodeText(testPathEl)).toEqual(path);
    //     cleanup();
  },
  10000
);
