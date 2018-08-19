# API

### FirebaseDatabaseProvider Props

| Name | Type | Required | Default |
| :--- | :--- | :--- | :--- |
| firebase | [firebase](https://www.npmjs.com/package/firebase) | yes |  |
| authDomain | string | yes |  |
| apiKey | string | yes |  |
| databaseURL | string | yes |  |
| projectId | string | yes |  |
| messagingSenderId | string | no |  |
| storageBucket | string | no |  |
| children | React Node | no |  |
| render | \(\) =&gt; ReactNode | no |  |

### [Firebase Setup Reference](https://firebase.google.com/docs/database/web/start)

### FirebaseDatabaseNode Props



| Name | Type | Required | Default |
| :--- | :--- | :--- | :--- |
| path | string | yes |  |
| orderByChild | string | no | null |
| orderByValue | any | no | null |
| orderByKey | any | yes | null |
| limitToFirst | number | no | null |
| limitToLast | number | no | null |
| startAt | number | no | null |
| endAt | number | no | null |
| equalTo | any | no | null |
| children | React Node | no | null |
| render | \(\) =&gt; ReactNode | no | null |

### [Firebase Query Reference](https://firebase.google.com/docs/database/admin/retrieve-data#section-queries)

