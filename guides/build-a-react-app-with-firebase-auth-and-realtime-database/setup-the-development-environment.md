---
description: Quickly setup your development environment
---

# Setup the development environment

For the rest of the tutorial we'll be using Typescript. 

If you haven't had a chance to work with Typescript, don't worry, the only major difference in our case is that we will use `.ts` extension instead of `.js` and `.tsx` instead of `.jsx`

We'll be using [parcel](https://github.com/parcel-bundler/parcel) to bundle our typescript code.

1-  Create a directory for the app and cd into it :

```bash
mkdir tutorial-bookmarking-app
cd tutorial-bookmarking-app
```

2- Create a package.json 

```bash
yarn init -y
```

3- Add a .gitignore file to ignore temporary files and dependencies

{% code-tabs %}
{% code-tabs-item title=".gitignore" %}
```bash
node_modules
dist
```
{% endcode-tabs-item %}
{% endcode-tabs %}

4- Install parcel-bundler as a development dependency \(and prettier & typescript OPTIONAL\)

```bash
yarn add -D parcel-bundler # npm i -D parcel-bundler
# 
yarn add -D prettier
yarn add -D typescript
yarn tsc --init
```

5- Create a src/ folder in which our source code will belong

```bash
mkdir src
```

6- Inside src/ create a minimal index.html file

{% code-tabs %}
{% code-tabs-item title="src/index.html" %}
```markup
<html>
    <head></head>
    <body>
        <div id="root"></div>
        <script src="./index.tsx"></script>
    </body>
</html>
```
{% endcode-tabs-item %}
{% endcode-tabs %}

7- Inside src/ create an initial `index.tsx` file

{% code-tabs %}
{% code-tabs-item title="src/index.tsx" %}
```typescript
const concept = "world";
document.getElementById("root").innerHTML = `
    Hello ${concept} !
`;
```
{% endcode-tabs-item %}
{% endcode-tabs %}

8- Add a `dev` script to your package.json that runs parcel with hot-reloading

{% code-tabs %}
{% code-tabs-item title="package.json" %}
```javascript
{
  "name": "tutorial-bookmarking-app",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "devDependencies": {
    "parcel-bundler": "^1.9.7"
  },
  "scripts": {
    "dev": "parcel src/index.html"
  }
}

```
{% endcode-tabs-item %}
{% endcode-tabs %}

9- Make sure everything is working.

```bash
yarn dev # or npm run dev
```

Our development environment is now ready on `localhost:1234`  🎉

### [Git Commit](https://github.com/rakannimer/react-firebase/commit/f36141dfb9038b0a820bcd3dc98e2d2197b03cdf)

