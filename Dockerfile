FROM node:14-alpine

# Create app directory
WORKDIR /usr/src/app

# Install additional dependencies.
RUN apk add --update vim

# Add the dependencies files to install dependencies before copying (cache installed node_modules as a separate layer).
ADD ./.env ./package.json ./yarn.lock ./
RUN yarn install

# Copy everything excepted things excluded from .dockerignore.
COPY . ./

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED 1

# Building app
RUN yarn build

ENV NPM_CONFIG_LOGLEVEL warn
RUN npm prune --production

EXPOSE 3000

# Running the app
CMD [ "npm", "start" ]
