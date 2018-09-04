import * as React from "react";

import { FirebaseDatabaseContextConsumerLifeCycleProps } from "../types";
import { hasFirebaseQueryChanged } from "../utils";

export class FirebaseDatabaseContextConsumerLifeCycle extends React.Component<
  FirebaseDatabaseContextConsumerLifeCycleProps & { componentID: any }
> {
  componentDidMount() {
    const { registerNode, componentID } = this.props;
    registerNode(componentID, this.props);
  }
  componentDidUpdate() {
    const { registerNode, componentID } = this.props;
    registerNode(componentID, this.props);
  }
  componentWillUnmount() {
    const { removeNode, path, componentID } = this.props;
    removeNode(componentID, path);
  }
  shouldComponentUpdate(
    nextProps: FirebaseDatabaseContextConsumerLifeCycleProps
  ) {
    return hasFirebaseQueryChanged(this.props, nextProps);
  }
  render() {
    return null;
  }
}
