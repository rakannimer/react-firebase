# API

### FirebaseDatabaseProvider Props

| Name | Type | Required | Default |
| :--- | :--- | :--- | :--- |
| firebase | [firebase](https://www.npmjs.com/package/firebase) | no |  |
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
| children | \({path:string, isLoading,:boolean, value:any}\) =&gt; ReactNode | no | null |

### [Firebase Query Reference](https://firebase.google.com/docs/database/admin/retrieve-data#section-queries)

### FirebaseDatabaseMutation Props



| Name | Type | Required | Default |
| :--- | :--- | :--- | :--- |
| path | string | yes |  |
| type | "set" \| "update" \| "push" | yes |  |
| children | \(   {     runMutation: \(value:any\) =&gt; Promise&lt;{key?:string}&gt;   } \) =&gt; ReactNode | yes | null |

### [Firebase Write Data Reference](https://firebase.google.com/docs/database/web/read-and-write#reading_and_writing_data)

### FirebaseDatabaseTransaction Props



| Name | Type | Required | Default |
| :--- | :--- | :--- | :--- |
| path | string | yes |  |
| children | \(   {     runTransaction: \({        reducer: \(val:any\) =&gt; any      }\) =&gt; Promise&lt;void&gt;   } \) =&gt; ReactNode | yes | null |

### [Firebase Transaction Reference](https://firebase.google.com/docs/database/web/read-and-write#save_data_as_transactions)



