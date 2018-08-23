# Read Data

2 components need to read data the Search component and the History List components

Our Search component looks like this : 

```jsx
const Search = () => {
  return <AutoComplete items={[]} />;
};
```

We want to connect it to the database at `user_bookmarks/` path.

![What our data looks like.](../../.gitbook/assets/screen-shot-2018-08-23-at-5.27.10-pm.png)

The code we get : 

```jsx
const Search = () => {
  return (
    <FirebaseDatabaseNode path="user_bookmarks/">
      {data => {
        const { value } = data;
        if (value === null || typeof value === "undefined") return null;
        const keys = Object.keys(value);
        const values = Object.values(value);
        const valuesWithKeys = values.map(
          (value, i) =>
            ({
              link_url:value.link_url,
              link_description: value.link_description,
              id: keys[i]
            })
        );
        return <AutoComplete items={valuesWithKeys} />;
      }}
    </FirebaseDatabaseNode>
  );
};
```

That's it !

Now for the list showing user\_bookmarks sorted by user\_bookmarks/created\_on, we want to change

```jsx
<MenuItem>Item </MenuItem>
<MenuItem>Item</MenuItem>
<MenuItem>Item</MenuItem>
```

to a dynamic list of items : 

```jsx
<FirebaseDatabaseNode path="user_bookmarks/">
  {({ value }) => {
    if (value === null || typeof value === "undefined") return null;
    const keys = Object.keys(value);
    const values = Object.values(value);
    return values.map((val, i) => (
      <MenuItem key={keys[i]}>{val.link_description} </MenuItem>
    ));
  }}
</FirebaseDatabaseNode>;
```

That's it ! We now have an app that writes, reads and searches in Firebase !

You can check the full code[ here](https://github.com/rakannimer/react-firebase/tree/16a96e7d06285da2ea14ccb342b2ec295f019064/modules/tutorial-bookmarking-app/src).

And a gif here : 

![](../../.gitbook/assets/react-firebase-tutorial-result-gif.gif)

