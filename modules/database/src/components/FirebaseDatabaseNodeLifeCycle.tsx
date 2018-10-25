import * as React from "react";
import sortBy from "lodash/sortBy";
import keys from "lodash/keys";
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
  hasStateChanged,
  whichPropsChanged
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

  handleOnce = (
    props: FirebaseDatabaseNodeProps,
    prevProps: FirebaseDatabaseNodeProps | null,
    ref: ReturnType<typeof getFirebaseQuery>
  ) => {
    this.ss()(reducers.setIsLoading(true));
    ref.once("value", (v: any) => {
      this.ss()(reducers.setIsLoading(false));
      if (!v) return;
      if (v.val() === null) return;
      const value = v.val();
      const { keysOnly, isList, orderByChild } = props;
      // console.warn({ value });
      if (!keysOnly && !isList) {
        this.ss()(reducers.setValue(value));
        return;
      }
      const unsortedKeys = keys(value);
      const sortedKeys = orderByChild
        ? (sortBy(
            unsortedKeys,
            key => value[key][orderByChild as string]
          ) as string[])
        : unsortedKeys;
      if (keysOnly) {
        this.ss()(reducers.setValue(sortedKeys));
        return;
      }
      if (isList) {
        const val = sortedKeys.map(key => ({ key, data: value[key] }));
        this.ss()(reducers.setValue(val));
        return;
      } else {
        this.ss()(reducers.setValue(value));
        return;
      }
    });
  };
  handleOn = (
    props: FirebaseDatabaseNodeProps,
    prevProps: FirebaseDatabaseNodeProps | null,
    ref: ReturnType<typeof getFirebaseQuery>
  ) => {
    this.unsub && this.unsub();
    this.ss()(reducers.setIsLoading(true));
    this.unsub = ref.on("value", (v: any) => {
      this.ss()(reducers.setIsLoading(false));
      if (!v) return;
      if (v.val() === null) return;
      const value = v.val();
      const { keysOnly, isList, orderByChild } = props;
      // console.warn({ value });
      if (!keysOnly && !isList) {
        this.ss()(reducers.setValue(value));
        return;
      }
      const unsortedKeys = keys(value);
      const sortedKeys = orderByChild
        ? (sortBy(
            unsortedKeys,
            key => value[key][orderByChild as string]
          ) as string[])
        : unsortedKeys;
      if (keysOnly) {
        this.ss()(reducers.setValue(sortedKeys));
        return;
      }
      if (isList) {
        const val = sortedKeys.map(key => ({ key, data: value[key] }));
        this.ss()(reducers.setValue(val));
        return;
      } else {
        this.ss()(reducers.setValue(value));
        return;
      }
    });
  };

  listenToRef = (
    props: FirebaseDatabaseNodeProps,
    prevProps: FirebaseDatabaseNodeProps | null
  ) => {
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

    if (propsOrNull.once) {
      this.handleOnce(props, prevProps, query);
    } else {
      this.handleOn(props, prevProps, query);
    }
  };
  componentDidMount() {
    this.__isMounted = true;
    this.listenToRef(getPropsOrNull(this.props), null);
  }
  componentDidUpdate(prevProps: FirebaseDatabaseNodeProps) {
    if (havePropsChanged(this.props, prevProps)) {
      this.listenToRef(getPropsOrNull(this.props), getPropsOrNull(prevProps));
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
