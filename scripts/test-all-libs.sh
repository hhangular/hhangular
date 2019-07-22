#!/bin/bash

echo ==================================================================================================
echo Test all lib in projects directory
echo ==================================================================================================
for dir in projects/*/
do
  dir="${dir%/}"
  dir="${dir##*/}"
  echo Test lib : ${dir}
  echo ===========
  npm run test ${dir} -- --no-watch --no-progress --code-coverage --browsers=ChromeHeadless
#  npm run e2e ${dir} -- --protractor-config=e2e/protractor-ci.conf.js
  codecov -f coverage/${dir}/lcov.info --disable=gcov -t $CODECOV_TOKEN
done
