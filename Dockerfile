FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install additional dependencies.
RUN apt-get update && apt-get -y install \
    vim;

# Add the dependencies files to install dependencies before copying (optimization).
ADD ./.env ./package.json ./yarn.lock ./
RUN yarn install

# Copy everything excepted things excluded from .dockerignore.
COPY . ./

ENV NODE_ENV=production

# Building app
RUN yarn build

# Running the app
CMD [ "npm", "start" ]
