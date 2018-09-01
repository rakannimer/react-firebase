import * as React from "react";
import { renderAndAddProps } from "render-and-add-props";
import { getContext } from "../Context";
import { FirebaseQuery } from "../types";
export { FirebaseDatabaseProvider } from "./FirebaseDatabaseProvider";
import { FirebaseDatabaseContextConsumerLifeCycle } from "./FirebaseDatabaseContextConsumerLifeCycle";

export type FirebaseDatabaseNodeProps = {
  children?: (
    { value, path, isLoading }: { value: any; path: string; isLoading: boolean }
  ) => React.ReactNode;
} & FirebaseQuery;

export class FirebaseDatabaseNode extends React.Component<
  FirebaseDatabaseNodeProps
  > {
  render() {
    const { children, path } = this.props;
    const { FirebaseDatabaseContextConsumer } = getContext();
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
                ...context.dataTree[path]
              })}
            </React.Fragment>
          );
        }}
      </FirebaseDatabaseContextConsumer>
    );
  }
}
