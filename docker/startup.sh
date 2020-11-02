#!/bin/sh
#
# Docker "app" startup process.
# Author: Kevin Wenger
#
# Run as `./app-start.sh`
#

# Export environment variable that may be used by Cron.
export > /var/www/.env.docker

# Build the application with styles.
yarn build

# Start the Next server.
yarn start
