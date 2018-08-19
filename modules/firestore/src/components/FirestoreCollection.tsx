import * as React from "react";
import { renderAndAddProps } from "render-and-add-props";

import { FirestoreContextConsumer } from "../Context";
import { FirestoreQuery } from "../types";
import { FirestoreCollectionContextConsumerLifeCycle } from "./FirestoreCollectionContextConsumerWithLifecycle";

export class FirestoreCollection extends React.Component<FirestoreQuery> {
  constructor(props: FirestoreQuery) {
    super(props);
    this.state = {};
  }
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
                data: context.dataTree[path],
                loadingStatus: context.dataTree[path]
                  ? context.dataTree[path].loadingStatus
                  : "loading"
              })}
            </React.Fragment>
          );
        }}
      </FirestoreContextConsumer>
    );
  }
}
