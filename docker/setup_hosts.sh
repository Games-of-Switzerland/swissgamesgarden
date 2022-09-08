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

host gos_staging-app-1 | awk '/has address/ { print  $4 "  staging-api-gos.museebolo.ch" }' >> /etc/hosts
host gos_production_app_1 | awk '/has address/ { print  $4 "  api-gos.museebolo.ch" }' >> /etc/hosts
host gos_staging-app-1 | awk '/has address/ { print  $4 "  staging-api.swissgames.garden" }' >> /etc/hosts
host gos_production_app_1 | awk '/has address/ { print  $4 "  api.swissgames.garden" }' >> /etc/hosts

cat /etc/hosts

# Run command
if [ ! -z "$CMD" ]; then
  exec "${CMD[@]}"
fi
