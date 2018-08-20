---
description: Setting up Firebase Data Generator with firebase-admin
---

# Setup

1. First you need a Private Key from firebase for privileged environments, find out how to get it here: [`https://firebase.google.com/docs/admin/setup`](https://firebase.google.com/docs/admin/setup) \(or replace `YOUR_PROJECT_NAME_HERE` with your project name here : `https://console.firebase.google.com/project/YOUR_PROJECT_NAME_HERE/settings/serviceaccounts/adminsdk`
2. Place that private key `json` file somewhere in your project.
3. Take note of your databaseURL.
4. Create a schema for the data you want to generate.

### Installation

#### API

```bash
yarn add generate-firebase-data
```

#### CLI

```bash
# In your project :
yarn add -D generate-firebase-data
yarn generate-firebase-data <schemaFilePath> <credentialsFilePath>

# Or globally :
npm i -g generate-firebase-data
generate-firebase-data <schemaFilePath> <credentialsFilePath>
```



