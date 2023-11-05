# Project Name

Fileverse Uploader.

## Features

- Nodejs, IPFS, MongoDB.

## Steps to run the app

Provide step-by-step instructions on how to install your project. You can include code snippets or commands here.

```bash
- git clone https://github.com/dev-script/fileverse-uploader.git
- cd yourproject
- Install the dependencies with `npm install`
- Create a `.env` file in root & copy the keys from [.env.sample](.env.sample) file
- Start the server in development `npm start`
- Run test cases `npm run start`

## Production using pm2
- create file .pm2.json in root directory
- paste .pm2.json.sample file content into .pm2.json file or can edit pm2 configs 
- pm2:deploy - install all dependencies and deploy app
- pm2:stop - stop pm2 instance
- pm2:restart - restart running pm2 instance

## Docker
- Build the Docker Image: docker build -t fileverse-uploader .
- Run the Docker Container with the .env File: docker run --env-file .env fileverse-uploader
```
## Folder Structure

- __fileverse\-uploader__
   - [Dockerfile](Dockerfile)
   - [README.md](README.md)
   - __config__
     - [constants.js](config/constants.js)
     - [index.js](config/index.js)
     - [log\-config.json](config/log-config.json)
     - [message.js](config/message.js)
   - __db__
     - [connection.js](db/connection.js)
     - __controllers__
       - [common.js](db/controllers/common.js)
       - [index.js](db/controllers/index.js)
     - [index.js](db/index.js)
     - __models__
       - [files.js](db/models/files.js)
       - [index.js](db/models/index.js)
   - [package.json](package.json)
   - [server.js](server.js)
   - __src__
     - __file__
       - [file.controller.js](src/file/file.controller.js)
       - [file.route.js](src/file/file.route.js)
       - [file.validation.js](src/file/file.validation.js)
   - __test__
     - [db\-get\-all\-files.js](test/db-get-all-files.js)
     - [get\-ipfs\-file.js](test/get-ipfs-file.js)
     - [ipfs\-file\-upload.js](test/ipfs-file-upload.js)
   - __utilities__
     - [common\-utils.js](utilities/common-utils.js)
     - [ipfs.js](utilities/ipfs.js)
     - [log\-service.js](utilities/log-service.js)
     - [server\-utils.js](utilities/server-utils.js)

