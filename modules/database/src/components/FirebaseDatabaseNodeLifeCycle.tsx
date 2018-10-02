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
    if (props.isList) {
      console.warn(
        `Can't fetch list with once option. \n Remove isList and create the list from the firebase result yourself.`
      );
    }
    ref.once("value", (v: any) => {
      this.ss()(reducers.setIsLoading(false));
      const value = v && v.val();
      if (props.keysOnly) {
        this.ss()(reducers.setValue(isObject(value) ? Object.keys(value) : []));
      } else if (props.isList) {
        this.ss()(
          reducers.setValue(
            isObject(value)
              ? Object.keys(value).map(key => ({ key, data: value[key] }))
              : []
          )
        );
      } else {
        this.ss()(reducers.setValue(value));
      }
    });
  };
  handleOn = (
    props: FirebaseDatabaseNodeProps,
    prevProps: FirebaseDatabaseNodeProps | null,
    ref: ReturnType<typeof getFirebaseQuery>
  ) => {
    let childIndex = 0;
    const { keysOnly } = props;
    // if (props.limitToFirst < prevProps.limitToFirst)
    if (!props.isList) {
      this.ss()(reducers.setIsLoading(true));
      ref.on("value", (v: any) => {
        this.ss()(reducers.setIsLoading(false));
        const value = v && v.val();
        this.ss()(reducers.setPath(props.path));
        if (props.keysOnly) {
          this.ss()(
            reducers.setValue(isObject(value) ? Object.keys(value) : [])
          );
        } else {
          this.ss()(reducers.setValue(value));
        }
      });
      return;
    }
    const changedProps = whichPropsChanged(
      props,
      prevProps ? prevProps : props
    );
    const hasLimitChanged =
      changedProps.length > 0 &&
      (changedProps.includes("limitToFirst") ||
        changedProps.includes("limitToLast"));
    if (prevProps !== null && hasLimitChanged) {
      if (changedProps.includes("limitToLast")) {
        const previousLimitToLast =
          parseInt(`${prevProps.limitToLast}`, 10) || 0;
        const limitToLast = parseInt(`${props.limitToLast}`, 10) || 0;
        if (previousLimitToLast > limitToLast) {
          this.ss()(
            reducers.removeFirstFromList(previousLimitToLast - limitToLast)
          );
        }
      } else if (changedProps.includes("limitToFirst")) {
        const previousLimitToFirst =
          parseInt(`${prevProps.limitToFirst}`, 10) || 0;
        const limitToFirst = parseInt(`${props.limitToFirst}`, 10) || 0;
        if (previousLimitToFirst > limitToFirst) {
          this.ss()(
            reducers.removeLastFromList(previousLimitToFirst - limitToFirst)
          );
        }
      }
    }
    this.unsub && this.unsub();
    const unsub1 = ref.on("child_added", (v: any) => {
      if (!v) return;
      const value = v && v.val();
      if (childIndex === 0) {
        this.ss()(reducers.setIsLoading(false));
        // this.ss()(reducers.clearList());
      }
      childIndex += 1;

      if (props.limitToLast) {
        this.ss()(
          keysOnly
            ? reducers.addKeyToList(v.key)
            : reducers.addToList(value, v.key)
        );
      } else {
        this.ss()(
          keysOnly
            ? reducers.addKeyToList(v.key)
            : reducers.addToList(value, v.key)
        );
      }
    });
    const unsub2 = ref.on("child_removed", (v: any) => {
      if (!v) return;
      const value = v && v.val();
      this.ss()(
        keysOnly
          ? reducers.removeKeyFromList(v.key)
          : reducers.removeFromList(value, v.key)
      );
    });
    this.unsub = () => {
      unsub1 && unsub1();
      unsub2 && unsub2();
    };
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
