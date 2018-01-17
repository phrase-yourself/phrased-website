#!/bin/bash

set -eu

function is_ci_release_build {
  [[ -n "${TRAVIS_TAG:-}" ]]
}

function task_usage {
  echo "usage: $0 watch | release"
  exit 1
}

function task_watch {
  npm run watch
}

function task_deploy {
  npm run build-js
  npm run build-css
  rsync -vru bundle.* index.html deploy-phrased-org@turing.holderbaum.me:www/
}

args=${1:-}
shift || true
case "$args" in
  watch) task_watch ;;
  deploy) task_deploy ;;
  *) task_usage ;;
esac
