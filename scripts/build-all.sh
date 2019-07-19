#!bin/bash

echo ==================================================================================================
echo Build all lib in projects directory
echo ==================================================================================================
for dir in projects/*/
do
  dir="${dir%/}"
  dir="${dir##*/}"
  echo Build lib : ${dir}
  echo ===========
  ng build ${dir} --prod
done

echo ==================================================================================================
echo Build website
echo ==================================================================================================
ng build --prod --base-href .

echo ==================================================================================================
echo Duplicate index.html to 404.html
echo ==================================================================================================
cp dist/hhagular/index.html dist/hhagular/404.html
