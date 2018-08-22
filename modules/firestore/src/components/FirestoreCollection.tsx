import * as React from "react";
import { renderAndAddProps } from "render-and-add-props";

import { FirestoreContextConsumer } from "../Context";
import { FirestoreQuery } from "../types";
import { FirestoreCollectionContextConsumerLifeCycle } from "./FirestoreCollectionContextConsumerWithLifecycle";

export class FirestoreCollection extends React.Component<
  FirestoreQuery & {
    children: (
      {

      }: {
        path: string;
        value: any;
        isLoading: boolean;
      }
    ) => React.ReactNode;
  }
> {
  render() {
    const { children, path } = this.props;
    if (path === null) {
      console.warn("path not provided to FirestoreNode ! Not rendering.");
      return null;
    }
    return (
      <FirestoreContextConsumer>
        {context => {
          return (
            <React.Fragment>
              <FirestoreCollectionContextConsumerLifeCycle
                {...context}
                path={path}
                {...this.props}
              />
              {renderAndAddProps(children, {
                path,
                value: context.dataTree[path].value,
                isLoading:
                  context.dataTree[path] && context.dataTree[path].isLoading
              })}
            </React.Fragment>
          );
        }}
      </FirestoreContextConsumer>
    );
  }
}
