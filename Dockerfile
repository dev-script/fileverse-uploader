# Use an official Node.js runtime as the base image
FROM node:17

# Create and set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Expose the port your application will listen on
EXPOSE $PORT

# Start your Node.js application
CMD [ "node", "server.js" ]
