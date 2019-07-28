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
  npm run test:ci:$1
#  npm run e2e:ci:$1
  codecov -f coverage/${dir}/lcov.info --disable=gcov -t $CODECOV_TOKEN
done
