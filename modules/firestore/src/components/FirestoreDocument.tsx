import * as React from "react";
import { renderAndAddProps } from "render-and-add-props";

import { FirestoreContextConsumer } from "../Context";
import { FirestoreQuery } from "../types";
import { FirestoreDocumentContextConsumerLifeCycle } from "./FirestoreDocumentContextConsumerWithLifecycle";

export class FirestoreDocument extends React.Component<FirestoreQuery> {
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
              <FirestoreDocumentContextConsumerLifeCycle
                {...context}
                path={path}
                {...this.props}
              />
              {renderAndAddProps(children, {
                path,
                value: context.dataTree[path] && context.dataTree[path].value,
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
