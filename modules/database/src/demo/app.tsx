import * as React from "react";
import * as firebase from "firebase/app";
import "firebase/database";
import { Toggle, State } from "react-powerplug";
//@ts-ignore
import { View, Text, FlatList } from "react-native-web";
//@ts-ignore
import Component from "@reach/component-component";

import { config } from "./test-credentials";

import {
  FirebaseDatabaseNode,
  FirebaseDatabaseProvider,
  FirebaseDatabaseNodes
} from "../index";
import { FirebaseDatabaseMutation } from "../components/FirebaseDatabaseMutation";
import { FirebaseDatabaseTransaction } from "../components/FirebaseDatabaseTransaction";
import ReactJson from "react-json-view";
import { renderAndAddProps } from "render-and-add-props";

const s = (v: any) => JSON.stringify(v, null, 2);

// export const PostIDs = ({ children }) => {
//   return (
//     <FirebaseDatabaseNode path="posts" isList keysOnly limitToFirst={2}>
//       <IfDefined>{children}</IfDefined>
//     </FirebaseDatabaseNode>
//   );
// };

export type RunSideEffectProps = {
  sideEffect: () => void;
  children?: any;
};
export const RunSideEffect: React.StatelessComponent<RunSideEffectProps> = ({
  sideEffect,
  children
}: RunSideEffectProps) => {
  sideEffect();
  return children ? children : null;
};

export type PreloaderProps = {
  dataMap: Map<string, any>;
  onChange: (dataMap: PreloaderProps["dataMap"]) => void;
};

export type FirebaseChildRenderProps = {
  value: any;
};

export type FirebaseKeysChildRenderProps = {
  value: string[];
};

export type FirebaseListChildRenderProps = {
  value: Array<{ key: string; data: any }>;
};

const DataNode = ({ path = "", render = (val: any) => null }) => {
  return (
    <FirebaseDatabaseNode path={path}>
      <IfDefined>
        {({ value }: FirebaseChildRenderProps) => render(value)}
      </IfDefined>
    </FirebaseDatabaseNode>
  );
};

export const IfDefined = ({ value, children }: { value: any; children: any }) =>
  value ? renderAndAddProps(children, { value }) : null;
export const Preloader: React.StatelessComponent = () => {
  return (
    <FirebaseDatabaseNode path="posts" isList keysOnly limitToFirst={2}>
      <IfDefined>
        {({ value: postIDs }: FirebaseKeysChildRenderProps) => (
          <React.Fragment>
            {postIDs.map(postID => (
              <React.Fragment key={postID}>
                <FirebaseDatabaseNode path={`posts/${postID}`}>
                  <IfDefined>
                    {({ value: { author_id } }: FirebaseChildRenderProps) => {
                      return (
                        <React.Fragment>
                          <DataNode path={`users/${author_id}`} />

                          <FirebaseDatabaseNode
                            path={`comments/${postID}`}
                            isList
                            limitToFirst={2}
                          >
                            <IfDefined>
                              {({
                                value: comments
                              }: FirebaseListChildRenderProps) =>
                                comments.map(({ data: com, key }) => (
                                  <React.Fragment key={key}>
                                    <FirebaseDatabaseNode
                                      path={`users/${com.userID}`}
                                    >
                                      {({ value }) => null}
                                    </FirebaseDatabaseNode>
                                  </React.Fragment>
                                ))
                              }
                            </IfDefined>
                          </FirebaseDatabaseNode>
                        </React.Fragment>
                      );
                    }}
                  </IfDefined>
                </FirebaseDatabaseNode>
              </React.Fragment>
            ))}
          </React.Fragment>
        )}
      </IfDefined>
    </FirebaseDatabaseNode>
  );
};

// export const App2 = () => {
//   return (
//     <FirebaseDatabaseProvider firebase={firebase} {...config}>
//       <Preloader />
//       <div id="posts" hidden>
//         <h2>Posts</h2>
//         <FirebaseDatabaseNode path="posts" isList keysOnly limitToFirst={2}>
//           {({ value }) => (
//             <div>
//               <h2>Post IDs</h2>
//               <pre>{s(value)}</pre>
//               {value &&
//                 value.map(postKey => (
//                   <div key={postKey}>
//                     <pre>Post ID : {s(postKey)}</pre>
//                     <FirebaseDatabaseNode path={`posts/${postKey}`}>
//                       {({ value }) =>
//                         value && (
//                           <div>
//                             <FirebaseDatabaseNode
//                               path={`users/${value.author_id}`}
//                             >
//                               {({ value: author }) =>
//                                 author && (
//                                   <div>
//                                     <h3>Author :</h3>
//                                     <pre> {s(author)}</pre>
//                                   </div>
//                                 )
//                               }
//                             </FirebaseDatabaseNode>
//                             <h2>Post :</h2>
//                             <pre>{s(value)}</pre>
//                             <h3>Comments </h3>
//                             <FirebaseDatabaseNode
//                               path={`comments/${postKey}`}
//                               isList
//                               limitToFirst={2}
//                             >
//                               {({ value }) =>
//                                 value &&
//                                 value.map(({ key, data: { data, userID } }) => (
//                                   <React.Fragment key={key}>
//                                     <pre>{s({ key, data, userID })}</pre>
//                                     <h5>Comment : {data}</h5>
//                                     <h5>Comment AuthorID : {userID}</h5>
//                                     <h5>Comment Author </h5>
//                                     <FirebaseDatabaseNode
//                                       path={`users/${userID}`}
//                                     >
//                                       {({ value }) => (
//                                         <div>
//                                           <pre>{s(value)}</pre>
//                                         </div>
//                                       )}
//                                     </FirebaseDatabaseNode>
//                                   </React.Fragment>
//                                 ))
//                               }
//                             </FirebaseDatabaseNode>
//                           </div>
//                         )
//                       }
//                     </FirebaseDatabaseNode>
//                   </div>
//                 ))}
//             </div>
//           )}
//         </FirebaseDatabaseNode>
//       </div>
//     </FirebaseDatabaseProvider>
//   );
// };

export const App = () => {
  return <Preloader />;
};
