#!/bin/bash

echo ==================================================================================================
echo Test lib $1
echo ==================================================================================================
if [[ -d "projects/$1" ]]; then
  npm run test $1 -- --no-watch --no-progress --code-coverage --browsers=ChromeHeadless
#  npm run e2e $1 -- --protractor-config=e2e/protractor-ci.conf.js
  codecov -f coverage/$1/lcov.info --disable=gcov -t $CODECOV_TOKEN
fi
