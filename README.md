
# Habit-Fetch
https://github.com/WebClub-NITK/GDSC-NITK-Recruitments-2022/blob/main/RECRUITMENT_TASKS_2022.md#task-id-habit-tracker-app


## Setup

Step - 1 : Get into the CLI and..

```bash
 cd yourprojectDirectory/
```
Step - 2 : Now run npm init

```bash
npm init -y

```

Step - 3 : Install all the dependencies before starting the project

```bash
npm install express body-parser ejs mongoose node-fetch 
```

Step - 4 : Now create an javascript mail file

```bash
touch app.js
```

Step - 5 : Start requiring all the installed dependencies

```bash
//ES6 Module

import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import fetch from 'node-fetch';
import path from 'path';
const __dirname = path.resolve();
import mongoose, { Collection } from 'mongoose';
import findOrCreate from 'mongoose-findorcreate'

```

Step - 6 : Start the express server

```bash
const app = express()
```

Step - 7 : Set/Use the following

```bash
app.use(express.static(__dirname + "/public"))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))

```

Step - 9 : Listen on port 3000

```bash

app.listen(3000, function() {
    console.log("Server is running");
})

```


## Nodefetch

#### require nodefetch inside app.js

```bash
  import fetch from 'node-fetch';
```



## Screenshots

[![ss.jpg](https://i.postimg.cc/HsRX7KYv/ss.jpg)](https://postimg.cc/D8Q89xb1)




## Features

- Create Personalized Graph
- Track your habits
- Personal Dashboard 



