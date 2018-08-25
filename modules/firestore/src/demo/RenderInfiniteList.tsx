import * as React from "react";
import { State } from "react-powerplug";
import { FirestoreCollection } from "../components/FirestoreCollection";
import { testCollectionPath, s } from "./App";
export const RenderInfiniteList = () => (
  <div style={{ height: 300, width: 300, overflow: "auto" }}>
    <State initial={{ page: 0, pageLength: 1 }}>
      {({ state, setState }) => (
        <FirestoreCollection
          path={testCollectionPath}
          orderBy={[{ field: "nowOnCli", type: "desc" }]}
          limit={(state.page + 1) * state.pageLength}
        >
          {({ value }) => {
            return (
              <div>
                <pre>{s(value)}</pre>
                <button
                  onClick={() => {
                    console.log(state.page);
                    setState(
                      {
                        page: state.page + 1,
                        pageLength: state.pageLength
                      },
                      () => {
                        console.log(state.page);
                      }
                    );
                  }}
                >
                  Load More
                </button>
              </div>
            );
          }}
        </FirestoreCollection>
      )}
    </State>
  </div>
);
