import * as React from "react";

import { FirebaseDatabaseContextConsumerLifeCycleProps } from "../types";

export class FirebaseDatabaseContextConsumerLifeCycle extends React.Component<
  FirebaseDatabaseContextConsumerLifeCycleProps
  > {
  listenToNode() {
    const {  listenTo } = this.props;
    listenTo(this.props);
  }
  stopListeningToNode() {
    const { stopListeningTo, path } = this.props;
    stopListeningTo(path);
  }
  componentDidMount() {
    this.listenToNode();
  }
  componentDidUpdate() {
    this.listenToNode();
  }
  componentWillUnmount() {
    this.stopListeningToNode();
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
