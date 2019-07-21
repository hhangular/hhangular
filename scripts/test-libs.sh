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
  npm run test ${dir} -- --no-watch --no-progress --browsers=ChromeHeadless
#  npm run e2e ${dir} -- --protractor-config=e2e/protractor-ci.conf.js
  codecov -f coverage/${dir}/* -t $CODECOV_TOKEN
done
