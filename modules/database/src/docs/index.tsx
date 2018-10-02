// import * as React from "react";
// //@ts-ignore
// import Component from "@reach/component-component";
// import * as firebase from "firebase/app";
// import "firebase/database";

// import { FirebaseDatabaseNode } from "../components/FirebaseDatabaseNode";
// import { FirebaseDatabaseProvider } from "../components/FirebaseDatabaseProvider";
// import { config } from "../demo/test-credentials";
// // import { config } from "../demo/test-credentials.ts";

// export const Demo = () => (
//   <FirebaseDatabaseProvider firebase={firebase} {...config} isList>
//     <Component initialState={{ limit: 2 }}>
//       {({ state, setState }) => (
//         <React.Fragment>
//           <FirebaseDatabaseNode
//             path="user_bookmarks/"
//             limitToFirst={state.limit}
//             orderByValue={"created_on"}
//             isList
//           >
//             {d => {
//               return (
//                 <React.Fragment>
//                   <pre>Path {d.path}</pre>
//                   <pre style={{ height: 300, overflow: "auto" }}>
//                     Value {JSON.stringify(d.value, null, 2)}
//                   </pre>
//                 </React.Fragment>
//               );
//             }}
//           </FirebaseDatabaseNode>
//           <React.Fragment>
//             <button
//               onClick={() => {
//                 setState({ limit: state.limit + 1 });
//               }}
//             >
//               Load more
//             </button>
//             <button
//               onClick={() => {
//                 setState({ limit: state.limit > 1 ? state.limit - 1 : 1 });
//               }}
//             >
//               Load less
//             </button>
//           </React.Fragment>
//         </React.Fragment>
//       )}
//     </Component>
//   </FirebaseDatabaseProvider>
// );
