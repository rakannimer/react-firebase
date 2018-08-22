---
description: Adding React and React DOM
---

# Add React and React DOM

Now that we have a running website, let's start adding the dependencies we want to use for this project.

Install `react` and `react-dom` from NPM

```bash
yarn add react react-dom
# Add the community provided types for these libraries 
# (For typescript users only) 
yarn add -D @types/react @types/react-dom
```

And let's add a small React Component to the page

{% code-tabs %}
{% code-tabs-item title="src/index.tsx" %}
```jsx
import * as React from "react";
import { render } from "react-dom";
const concept = "world";

const App = () => {
  return <div>Hello {concept}</div>;
};

render(<App />, document.getElementById("root"));

```
{% endcode-tabs-item %}
{% endcode-tabs %}

#### Our React app is ready. 

### [Git Commit](https://github.com/rakannimer/react-firebase/commit/f36141dfb9038b0a820bcd3dc98e2d2197b03cdf)



