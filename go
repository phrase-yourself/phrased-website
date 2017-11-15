#!/bin/bash

set -eu

function ensure_wellington {
  mkdir -p .bin

  if [[ ! -f .bin/wt ]];
  then
    (
      cd .bin
      wget https://github.com/wellington/wellington/releases/download/v1.0.4/wt_v1.0.4_linux_amd64.tar.gz
      tar xf wt_v1.0.4_linux_amd64.tar.gz
      rm wt_v1.0.4_linux_amd64.tar.gz
    )
  fi
}

function task_usage {
  echo "usage: $0 watch"
  exit 1
}

function task_watch {
  ensure_wellington
  exec npm run watch
}

args=${1:-}
shift || true
case "$args" in
  watch) task_watch ;;
  *) task_usage ;;
esac
