# Use the specific Node.js image
FROM node:20.13.1-alpine

# Set the working directory
WORKDIR /home/node/app

# Copy package.json and yarn.lock files
COPY package*.json yarn.lock ./

# Install dependencies
RUN yarn

# fine-tune the permissions on our application code in the container
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# not sure if this is the right way to set not sensitive varialbes in .env to docker
# ARG NODE_ENV=production
# ENV NODE_ENV=$NODE_ENV

# set user permissions
USER node

# Copy the rest of the application code (with the appropriate permissions)
COPY --chown=node:node . .

# RUN --mount=type=secret,id=mytoken \
#     TOKEN=$(cat /run/secrets/mytoken)

# Build the TypeScript code
# TODO: fix the error while running this line. See if can use yarn install in dockerfile ??
RUN yarn build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
# TODO: figure out if this is the right way to run the app
CMD [ "yarn", "start"]
