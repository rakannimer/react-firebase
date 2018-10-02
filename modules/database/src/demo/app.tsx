import * as React from "react";
import * as firebase from "firebase/app";
import "firebase/database";
import { Toggle, State } from "react-powerplug";
//@ts-ignore
import { View, Text, FlatList } from "react-native-web";
//@ts-ignore
import Component from "@reach/component-component";

import { config } from "./test-credentials";

import {
  FirebaseDatabaseNode,
  FirebaseDatabaseProvider,
  FirebaseDatabaseNodes
} from "..";
import { FirebaseDatabaseMutation } from "../components/FirebaseDatabaseMutation";
import { FirebaseDatabaseTransaction } from "../components/FirebaseDatabaseTransaction";
import ReactJson from "react-json-view";
import { renderAndAddProps } from "render-and-add-props";
import { render } from "react-dom";
import { observable, IObservableValue } from "mobx";
import { observer } from "mobx-react";

export const formState = {
  path: observable.box("posts"),
  isList: observable.box(false),
  keysOnly: observable.box(false),
  limitToFirst: observable.box(2),
  limitToLast: observable.box(undefined),
  orderByChild: observable.box(undefined),
  orderByKey: observable.box(undefined),
  orderByValue: observable.box(undefined),
  startAt: observable.box(undefined),
  endAt: observable.box(undefined),
  equalTo: observable.box(undefined),
  once: observable.box(undefined)
};

const StringInput = observer(
  ({ obs, label = "" }: { obs: IObservableValue<any>; label: string }) => {
    return (
      <div className="mui-textfield">
        <input
          type="text"
          value={obs.get()}
          onChange={val => {
            // console.log(val.target.checked);
            obs.set(val.target.value);
          }}
        />
        <label>{label}</label>
      </div>
    );
  }
);

const BooleanInput = observer(
  ({ obs, label = "" }: { obs: IObservableValue<any>; label: string }) => {
    return (
      <div className="mui-checkbox">
        <input
          type="checkbox"
          checked={!!obs.get()}
          onChange={val => {
            // console.log(val.target.checked);
            obs.set(val.target.checked);
          }}
        />
        <label>{label}</label>
      </div>
    );
  }
);

const NumberInput = observer(
  ({ obs, label = "" }: { obs: IObservableValue<any>; label: string }) => {
    return (
      <div className="mui-textfield">
        <input
          type="number"
          name={label}
          value={`${obs.get()}`}
          onChange={val => {
            console.log(val.target.value);
            const asInt = parseInt(val.target.value, 10);
            if (isNaN(asInt)) return;
            obs.set(asInt);
          }}
        />
        <label htmlFor={label}>{label}</label>
      </div>
    );
  }
);

export const App = observer(({ form = formState }) => {
  return (
    <div className="mui-container-fluid">
      <FirebaseDatabaseProvider firebase={firebase} {...config}>
        <div className="mui-row" style={{ marginTop: 60 }}>
          <div className="mui-col-md-3 mui-col-md-offset-1">
            <form
              className="mui-form"
              onSubmit={ev => {
                ev.preventDefault();
              }}
            >
              <StringInput obs={form.path} label={"path"} />
              <NumberInput obs={form.limitToFirst} label={"limitToFirst"} />
              <NumberInput obs={form.limitToLast} label={"limitToLast"} />
              <StringInput obs={form.orderByChild} label={"orderByChild"} />
              <BooleanInput obs={form.orderByKey} label={"orderByKey"} />
              <BooleanInput obs={form.keysOnly} label={"keysOnly"} />
              <BooleanInput obs={form.isList} label={"isList"} />

              <StringInput obs={form.equalTo} label={"equalTo"} />
              <StringInput obs={form.startAt} label={"startAt"} />
              <StringInput obs={form.endAt} label={"endAt"} />
              <StringInput obs={form.orderByValue} label={"orderByValue"} />

              <BooleanInput obs={form.once} label={"once"} />
              <button type="submit" className="mui-btn mui-btn--raised">
                Submit
              </button>
            </form>
          </div>
          <div className="mui-col-md-6 mui--align-middle mui--text-center">
            <FirebaseDatabaseNode
              path={form.path.get()}
              equalTo={form.equalTo.get()}
              startAt={form.startAt.get()}
              endAt={form.endAt.get()}
              orderByChild={form.orderByChild.get()}
              orderByValue={form.orderByValue.get()}
              keysOnly={form.keysOnly.get()}
              isList={form.isList.get()}
              orderByKey={form.orderByKey.get()}
              once={form.once.get()}
              limitToFirst={form.limitToFirst.get()}
              limitToLast={form.limitToLast.get()}
            >
              {({ value }) =>
                value && (
                  <pre style={{ maxHeight: 500 }} data-testid="value">
                    {JSON.stringify(value, null, 2)}
                  </pre>
                )
              }
            </FirebaseDatabaseNode>
          </div>
        </div>
      </FirebaseDatabaseProvider>
    </div>
  );
});
