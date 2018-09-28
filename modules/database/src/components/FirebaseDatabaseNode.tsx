import * as React from "react";
import { getContext } from "../Context";
import { FirebaseDatabaseNodeProps } from "../types";
export { FirebaseDatabaseProvider } from "./FirebaseDatabaseProvider";
import FirebaseDatabaseNodeWithLifeCycle from "./FirebaseDatabaseNodeLifeCycle";

export class FirebaseDatabaseNode extends React.Component<
  FirebaseDatabaseNodeProps
> {
  render() {
    const { FirebaseDatabaseContextConsumer } = getContext();
    return (
      <FirebaseDatabaseContextConsumer>
        {context => {
          return (
            <React.Fragment>
              <FirebaseDatabaseNodeWithLifeCycle
                firebase={context.firebase}
                {...this.props}
              />
            </React.Fragment>
          );
        }}
      </FirebaseDatabaseContextConsumer>
    );
  }
}
export default FirebaseDatabaseNode;
