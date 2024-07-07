# Use the latest Node.js image
FROM node:latest

# fine-tune the permissions on our application code in the container
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# Set the working directory
WORKDIR /home/node/app

# Copy package.json and yarn.lock files
COPY package*.json yarn.lock ./

USER node

# Install dependencies
RUN npm install

# Copy the rest of the application code (with the appropriate permissions)
COPY --chown=node:node . .

# Build the TypeScript code
RUN npm build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD [ "node", "-r", "module-alias/register", "dist/index.js"]
