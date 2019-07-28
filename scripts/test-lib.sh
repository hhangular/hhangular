#!/bin/bash

echo ==================================================================================================
echo Test lib $1
echo ==================================================================================================
if [[ -d "projects/$1" ]]; then
  npm run test:ci:$1
#  npm run e2e:ci:$1
  codecov -f coverage/$1/lcov.info --disable=gcov -t $CODECOV_TOKEN
fi
