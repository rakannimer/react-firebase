# Add Firebase

Install the [firebase](https://www.npmjs.com/package/firebase) JS client.

```bash
yarn add firebase
# Or 
npm i firebase
```

Change `PROJECT_NAME` to your project name and grab your firebase config here : 

`https://console.firebase.google.com/project/PROJECT_NAME/settings/general/`

Your config file should look something like this : 

{% code-tabs %}
{% code-tabs-item title="src/test-credentials.ts" %}
```javascript
// Firebase Config
export const config = {
  apiKey: "API_KEY",
  projectId: "PROJECT_ID",
  databaseURL: "DATABASE_URL",
  authDomain: "AUTH_DOMAIN",
  // OPTIONAL
  storageBucket: "STORAGE_BUCKET",
  messagingSenderId: "MESSAGING_SENDER_ID"
};
```
{% endcode-tabs-item %}
{% endcode-tabs %}

{% hint style="info" %}
In the example repo this file is located in `src/test-credentials.ts` but you won't be able to find it because it's added to the `.gitignore`

Make sure you do the same if your repository is public.
{% endhint %}

### Git Commit

