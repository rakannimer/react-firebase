import * as React from "react";

import {
  FirebaseDatabaseNodeState,
  FirebaseDatabaseNodeProps,
  FirebaseQuery
} from "../types";
import { getFirebaseQuery } from "../get-firebase-query";
import { renderAndAddProps } from "render-and-add-props";
import {
  reducers,
  getPropsOrNull,
  havePropsChanged,
  hasStateChanged
} from "../reducers";

const isObject = (value: any) => typeof value === "object" && value !== null;

export class FirebaseDatabaseContextConsumerLifeCycle extends React.Component<
  FirebaseDatabaseNodeProps,
  FirebaseDatabaseNodeState
> {
  state = {
    firebase: null,
    path: null,
    orderByChild: null,
    orderByKey: null,
    orderByValue: null,
    limitToFirst: null,
    limitToLast: null,
    startAt: null,
    endAt: null,
    equalTo: null,
    keysOnly: null,
    once: null,
    isList: null,
    unsub: null,
    value: null,
    isLoading: null
  };
  __isMounted = false;
  unsub?: Function;
  ss = () => {
    if (this.__isMounted === false) {
      return (() => {}) as any;
    }
    return this.setState.bind(this);
  };
  listenToRef = () => {
    const propsOrNull = getPropsOrNull(this.props);
    const { firebase, path } = propsOrNull;
    if (firebase === null) {
      return;
    }
    if (path === null) {
      return;
    }
    this.ss()(reducers.setPath(path));
    this.ss()(reducers.setIsLoading(true));

    const query = getFirebaseQuery(propsOrNull as FirebaseQuery);
    this.unsub && this.unsub();

    if (propsOrNull.isList !== true) {
      query.once("value", (v: any) => {
        this.ss()(reducers.setIsLoading(false));
        const value = v && v.val();
        if (propsOrNull.keysOnly) {
          this.ss()(
            reducers.setValue(isObject(value) ? Object.keys(value) : [])
          );
        } else {
          this.ss()(reducers.setValue(value));
        }
      });
      return;
    }

    let isFirstChildAdded = true;
    const unsub1 = query.on("child_added", (v: any) => {
      if (!v) return;
      const value = v && v.val();
      if (isFirstChildAdded === true) {
        this.ss()(reducers.clearList());
      }
      isFirstChildAdded = false;
      this.ss()(reducers.addToList(value, v.key));
    });
    const unsub2 = query.on("child_removed", (v: any) => {
      if (!v) return;
      const value = v && v.val();
      this.ss()(reducers.removeFromList(value, v.key));
    });
    this.unsub = () => {
      unsub1 && unsub1();
      unsub2 && unsub2();
    };
  };
  componentDidMount() {
    this.__isMounted = true;
    this.listenToRef();
  }
  componentDidUpdate(prevProps: FirebaseDatabaseNodeProps) {
    if (havePropsChanged(this.props, prevProps)) {
      this.listenToRef();
    }
  }
  componentWillUnmount() {
    this.__isMounted = false;
    this.unsub && this.unsub();
  }
  shouldComponentUpdate(
    nextProps: FirebaseDatabaseNodeProps,
    nextState: FirebaseDatabaseNodeState
  ) {
    return (
      havePropsChanged(this.props, nextProps) ||
      hasStateChanged(this.state, nextState)
    );
  }
  render() {
    // console.warn("state ", getPropsOrNull(this.props));
    const { path, value, isLoading } = this.state;
    return renderAndAddProps(this.props.children, { path, value, isLoading });
  }
}

export default FirebaseDatabaseContextConsumerLifeCycle;
