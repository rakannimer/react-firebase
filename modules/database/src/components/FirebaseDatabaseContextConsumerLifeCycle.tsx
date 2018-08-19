import * as React from "react";

import { FirebaseDatabaseContextConsumerLifeCycleProps } from "../types";

export class FirebaseDatabaseContextConsumerLifeCycle extends React.Component<
  FirebaseDatabaseContextConsumerLifeCycleProps
> {
  listenToNodeIfNotInContext() {
    const { dataTree, path, listenTo } = this.props;
    if (path in dataTree) {
      return;
    }
    listenTo(this.props);
  }
  stopListeningToNode() {
    const { stopListeningTo, path } = this.props;
    stopListeningTo(path);
  }
  componentDidMount() {
    this.listenToNodeIfNotInContext();
  }
  componentDidUpdate() {
    this.listenToNodeIfNotInContext();
  }
  componentWillUnmount() {
    this.stopListeningToNode();
  }
  render() {
    return null;
  }
}
