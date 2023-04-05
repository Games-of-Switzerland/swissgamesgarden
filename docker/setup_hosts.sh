#!/usr/bin/env bash

set -eux

CMD=""

while [ $# -gt 0 ]; do
  case "$1" in
    --)
      shift
      CMD=("$@")
      break
      ;;
  esac
  shift
done

# The following "hack" prevent the docker container to go "outside" when reaching the Drupal APIs.
# Ineed, on the Bolo Server the host machine can't reach the internet.
host gos_staging_app_1 | awk '/has address/ { print  $4 "  staging-api.swissgames.garden" }' >> /etc/hosts
host gos_staging-app-1 | awk '/has address/ { print  $4 "  staging-api.swissgames.garden" }' >> /etc/hosts
host gos_staging-app | awk '/has address/ { print  $4 "  staging-api.swissgames.garden" }' >> /etc/hosts
host gos_production_app_1 | awk '/has address/ { print  $4 "  api.swissgames.garden" }' >> /etc/hosts
host gos_production-app-1 | awk '/has address/ { print  $4 "  api.swissgames.garden" }' >> /etc/hosts
host gos_production-app | awk '/has address/ { print  $4 "  api.swissgames.garden" }' >> /etc/hosts

cat /etc/hosts

# Run command
if [ ! -z "$CMD" ]; then
  exec "${CMD[@]}"
fi
