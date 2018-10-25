import * as React from "react";
import get from "lodash/get";
import set from "lodash/set";
import produce from "immer";

import { renderAndAddProps } from "render-and-add-props";
import { FirebaseDatabaseNode } from "./FirebaseDatabaseNode";
import { FirebaseDatabaseNodeProps } from "../types";
export type FirebaseDatabaseNodesProps = {
  children?: (
    { value, path, isLoading }: { value: any; path: string; isLoading: boolean }
  ) => React.ReactNode;
} & {
  nodes: {
    query?: Partial<FirebaseDatabaseNodeProps>;
    path: string;
    id: string;
  }[];
};

export type FirebaseDatabaseNodesState = {
  isLoading: boolean;
  value: {
    [id: string]: {
      isLoading: boolean;
      value: any;
    };
  };
};

const initialState = {
  isLoading: true,
  value: {}
} as FirebaseDatabaseNodesState;

const addNodeToState = (
  state: FirebaseDatabaseNodesState,
  {
    id,
    value,
    isLoading
  }: {
    id: string;
    value: any;
    isLoading: boolean;
  }
) => {
  const updatedState = produce(
    state,
    (newState: FirebaseDatabaseNodesState) => {
      set(newState, `value.${id}.value`, value);
      set(newState, `value.${id}.isLoading`, isLoading);
      return newState;
    }
  );
  return updatedState;
};

export type PureNodeReaderProps = {
  id: string;
  value: any;
  isLoading: boolean;
  onChange: (change: PureNodeReaderProps) => void;
};

export class PureNodeReader extends React.Component<PureNodeReaderProps> {
  componentDidMount() {
    const { id, value, isLoading, onChange } = this.props;
    onChange({ id, value, isLoading, onChange });
  }
  componentDidUpdate() {
    const { id, value, isLoading, onChange } = this.props;
    onChange({ id, value, isLoading, onChange });
  }
  shouldComponentUpdate(prevProps: PureNodeReaderProps) {
    const { id, value, isLoading, onChange } = this.props;
    return (
      prevProps.id !== id ||
      prevProps.value !== value ||
      prevProps.isLoading !== isLoading
    );
  }
  render() {
    return null;
  }
}

export class FirebaseDatabaseNodes extends React.PureComponent<
  FirebaseDatabaseNodesProps,
  FirebaseDatabaseNodesState
> {
  state = initialState;
  componentDidMount() {
    for (let node of this.props.nodes) {
      const { id } = node;
      this.setState(state =>
        addNodeToState(state, { id, value: null, isLoading: true })
      );
    }
  }
  componentDidUpdate() {
    const nodeIDs = this.props.nodes.map(n => n.id);
    for (let nodeID of nodeIDs) {
      if (!(nodeID in this.state.value)) {
        this.setState(state =>
          addNodeToState(state, { id: nodeID, value: null, isLoading: true })
        );
      }
    }
  }
  render() {
    return (
      <React.Fragment>
        {this.props.nodes.map(node => (
          <FirebaseDatabaseNode path={node.path} key={node.id} {...node.query}>
            {({ value, isLoading }) => {
              return (
                <PureNodeReader
                  value={value}
                  isLoading={isLoading}
                  id={node.id}
                  onChange={({ id, value, isLoading }) => {
                    this.setState(state =>
                      addNodeToState(state, { id, value, isLoading })
                    );
                  }}
                />
              );
            }}
          </FirebaseDatabaseNode>
        ))}
        {renderAndAddProps(this.props.children, this.state)}
      </React.Fragment>
    );
  }
}
