import * as React from "react";

import { FirestoreContextConsumerWithLifeCycleProps } from "../types";

export class FirestoreDocumentContextConsumerLifeCycle extends React.Component<
  FirestoreContextConsumerWithLifeCycleProps
> {
  listenToNodeIfNotInContext() {
    const { dataTree, path, listenTo } = this.props;
    if (path === null || path in dataTree) {
      return;
    }
    listenTo(this.props, "document");
  }
  stopListeningToNode() {
    const { stopListeningTo, path, dataTree } = this.props;
    if (path === null || path in dataTree) {
      return;
    }
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
