---
description: Generate mock Firebase data to quickly start building your UI.
---

# Generate Firebase Data

This module is meant to run on node NOT on the browser or react-native.  
Use this in your node server or on cli tools.

### Installation

#### API

```bash
  yarn add generate-firebase-data
  # If you don't already have firebase-admin as a dependency then add it too
  yarn add firebase-admin
```

#### CLI

```bash
  # In your project :
  yarn add -D generate-firestore-data
  yarn generate-firestore-data <schemaFilePath> <credentialsFilePath>

  # Or globally :
  npm i -g generate-firestore-data
  generate-firestore-data <schemaFilePath> <credentialsFilePath>
```

