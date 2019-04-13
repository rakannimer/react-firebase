import * as React from "react";
import { FirestoreContextConsumerWithLifeCycleProps } from "../types";
export class FirestoreCollectionContextConsumerLifeCycle extends React.Component<
  FirestoreContextConsumerWithLifeCycleProps
> {
  listenToNode() {
    const { dataTree, path, listenTo } = this.props;
    if (path === null) {
      return;
    }
    listenTo(this.props, "collection");
  }
  stopListeningToNode() {
    const { stopListeningTo, path, dataTree } = this.props;
    if (path === null || path in dataTree) {
      return;
    }
    stopListeningTo(path);
  }
  componentDidMount() {
    this.listenToNode();
  }
  shouldComponentUpdate(nextProps: FirestoreContextConsumerWithLifeCycleProps) {
    const propsThatCanChange = [
      "path",
      "limit",
      "startAfter",
      "startAt",
      "endAt",
      "endBefore",
      "where"
    ];
    for (let propName of propsThatCanChange) {
      //@ts-ignore
      if (this.props[propName] !== nextProps[propName]) {
        return true;
      }
    }
    return false;
  }

  componentDidUpdate() {
    this.listenToNode();
  }
  componentWillUnmount() {
    this.stopListeningToNode();
  }
  render() {
    return null;
  }
}
