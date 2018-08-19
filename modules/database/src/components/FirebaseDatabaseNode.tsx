import * as React from "react";
import { renderAndAddProps } from "render-and-add-props";

import { FirebaseDatabaseContextConsumer } from "../Context";
import { FirebaseQuery } from "../types";
export { FirebaseDatabaseProvider } from "./FirebaseDatabaseProvider";
import { FirebaseDatabaseContextConsumerLifeCycle } from "./FirebaseDatabaseContextConsumerLifeCycle";

export class FirebaseDatabaseNode extends React.Component<FirebaseQuery> {
  constructor(props: FirebaseQuery) {
    super(props);
    this.state = {};
  }
  render() {
    const { children, path } = this.props;
    return (
      <FirebaseDatabaseContextConsumer>
        {context => {
          return (
            <React.Fragment>
              <FirebaseDatabaseContextConsumerLifeCycle
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
      </FirebaseDatabaseContextConsumer>
    );
  }
}
