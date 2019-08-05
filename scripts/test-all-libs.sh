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
  npm run test:$1:ci
#  npm run e2e:$1:ci
  codecov -f coverage/${dir}/lcov.info --disable=gcov -t $CODECOV_TOKEN
done
