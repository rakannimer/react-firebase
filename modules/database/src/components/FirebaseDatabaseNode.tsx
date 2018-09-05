import * as React from "react";
import { renderAndAddProps } from "render-and-add-props";
import { createID } from "../utils";
import { getContext } from "../Context";
import { FirebaseQuery } from "../types";
export { FirebaseDatabaseProvider } from "./FirebaseDatabaseProvider";
import { FirebaseDatabaseContextConsumerLifeCycle } from "./FirebaseDatabaseNodeLifeCycle";

export type ChildFunctionProps = {
  value: any;
  path: string;
  isLoading: boolean;
};

type Renderable<T> =
  | React.Component<T>
  | React.StatelessComponent<T>
  | React.ReactChild;

export type FirebaseDatabaseNodeProps = {
  children?: Renderable<ChildFunctionProps>;
} & FirebaseQuery;

export class FirebaseDatabaseNode extends React.Component<
  FirebaseDatabaseNodeProps
> {
  __componentID = createID();
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
                componentID={this.__componentID}
                path={path}
                {...this.props}
              />
              {renderAndAddProps(children, {
                path,
                ...context.dataTree[this.__componentID]
              })}
            </React.Fragment>
          );
        }}
      </FirebaseDatabaseContextConsumer>
    );
  }
}
