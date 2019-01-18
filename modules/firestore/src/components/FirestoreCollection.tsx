import * as React from "react";
import { renderAndAddProps } from "render-and-add-props";
import get from "lodash/get";
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
        ids: string[];
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
                value: get(context, `dataTree[${path}].value`, null),
                ids: get(context, `dataTree[${path}].ids`, null),
                isLoading: get(context, `dataTree[${path}].isLoading`, true)
              })}
            </React.Fragment>
          );
        }}
      </FirestoreContextConsumer>
    );
  }
}
