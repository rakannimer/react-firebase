import * as React from "react";

import { FirebaseDatabaseContextConsumerLifeCycleProps } from "../types";

export class FirebaseDatabaseContextConsumerLifeCycle extends React.Component<
  FirebaseDatabaseContextConsumerLifeCycleProps
> {
  componentDidMount() {
    const { registerNode } = this.props;
    registerNode(this.props);
  }
  componentDidUpdate() {
    const { registerNode } = this.props;
    registerNode(this.props);
  }
  componentWillUnmount() {
    const { removeNode, path } = this.props;
    removeNode(path);
  }
  shouldComponentUpdate(
    nextProps: FirebaseDatabaseContextConsumerLifeCycleProps
  ) {
    const propsThatCanChange = [
      "path",
      "orderByChild",
      "orderByKey",
      "orderByValue",
      "limitToFirst",
      "limitToLast",
      "startAt",
      "endAt",
      "equalTo"
    ];
    for (let propName of propsThatCanChange) {
      //@ts-ignore
      if (this.props[propName] !== nextProps[propName]) {
        return true;
      }
    }
    return false;
  }
  render() {
    return null;
  }
}
