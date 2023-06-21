# Start from a base image
FROM node:14

# Set the working directory in the Docker container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install npm packages
RUN npm install

# Copy the rest of your app's source code to the working directory
COPY . .

# Expose the port your app runs on
EXPOSE 5001

# Run the app
CMD [ "node", "index.js" ]

