#!/bin/sh
#
# Script to deploy docker based Games of Switzerland
# on successful build of master/dev branch
# Author: Kevin Wenger
#
# Run as `./deploy.sh [staging|production]`
#

scriptDir=$( cd "$(dirname "${BASH_SOURCE}")" ; pwd -P )

# Extract the deploy_rsa in Travis /tmp folder to avoid deploying the decrypted key by any mean.
openssl aes-256-cbc -K $encrypted_db2095f63ba3_key -iv $encrypted_db2095f63ba3_iv -in "$TRAVIS_BUILD_DIR/scripts/travis/deploy_rsa.enc" -out "/tmp/deploy_rsa" -d

# Adding the key to the current ssh-agent to make any SSH-based command agnostic to the private key location.
eval "$(ssh-agent -s)"
chmod 600 /tmp/deploy_rsa
ssh-add /tmp/deploy_rsa

# Init deployment.
gem install bundler
bundle install
bundle exec cap "$1" deploy
