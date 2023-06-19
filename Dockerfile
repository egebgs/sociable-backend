# Specify the node base image
FROM node:16

# Specify the working directory in Docker
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source inside Docker
COPY . .

# Expose the port app runs on
EXPOSE 5001

# Command to start the app
CMD [ "node", "index.js" ]
