
# Writing Data

Let's start by adding a way to the user to add data to the their firebase database. 

To do this we will be using the FirebaseDatabaseMutation component from @react-firebase/database.

![User Input UI](../../.gitbook/assets/screen-shot-2018-08-23-at-3.48.18-pm.png)

When a user clicks on the + button we want to push data to user\_bookmarks/

The data should have the following shape : 

```typescript
{
    link_url: string,
    link_description: string,
    created_at: timestamp,
    updated_at: timestamp
}
```

```jsx
<FirebaseDatabaseMutation type="push" path="user_bookmarks">
  {({ runMutation }) => (
    <form
      onSubmit={ev => {
          ev.preventDefault();
          const newLink = get(this.newLinkTextFieldRef, "current.value", "");
          const newMeta = get(this.newLinkMetaTextFieldRef, "current.value", "");
          await runMutation({
            link_url: newLink,
            link_description: newMeta,
            created_at: firebase.database.ServerValue.TIMESTAMP,
            updated_at: firebase.database.ServerValue.TIMESTAMP
          });
          set(this.newLinkTextFieldRef, "current.value", "");
          set(this.newLinkMetaTextFieldRef, "current.value", "");
      }}
    >
      <input label="New Link URL" ref={this.newLinkTextFieldRef} />{" "}
      <input label="New Link Metadata" ref={this.newLinkMetaTextFieldRef} />{" "}
      <button type="submit"> + </button>
    </form>
  )}
</FirebaseDatabaseMutation>;
```

You can see the full code [here](https://github.com/rakannimer/react-firebase/tree/1c95420d8ecadd24ab2fefc3b89e16e4aef1ff34/modules/tutorial-bookmarking-app/src). 

