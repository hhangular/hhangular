#!/bin/bash

if [[ -d "projects/$1" ]]; then
  echo ==================================================================================================
  echo Test lib $1
  echo ==================================================================================================
  npm run test:$1:ci
#  npm run e2e:$1:ci
  codecov -f coverage/$1/lcov.info --disable=gcov -t $CODECOV_TOKEN
fi
