# Use official Node.js base image
FROM 835474150232.dkr.ecr.us-east-1.amazonaws.com/node-base-images:18-slim

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Expose the port the app runs on
EXPOSE 3001

# Start the app
CMD [ "node", "server.js" ]
