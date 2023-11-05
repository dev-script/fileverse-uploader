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

## Production using pm2
- create file .pm2.json in root directory
- paste .pm2.json.sample file content into .pm2.json file or can edit pm2 configs 
- pm2:deploy - install all dependencies and deploy app
- pm2:stop - stop pm2 instance
- pm2:restart - restart running pm2 instance

## Docker
- Build the Docker Image: docker build -t fileverse-uploader .
- Run the Docker Container with the .env File: docker run --env-file .env fileverse-uploader