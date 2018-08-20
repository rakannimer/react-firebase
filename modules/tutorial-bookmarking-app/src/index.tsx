import * as React from "react";
import { render } from "react-dom";
const concept = "world";

const App = () => {
  return <div>Hello {concept}</div>;
};

render(<App />, document.getElementById("root"));
