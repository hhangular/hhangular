#!/bin/bash

echo ==================================================================================================
echo Build all lib in projects directory
echo ==================================================================================================
for dir in projects/*/
do
  dir="${dir%/}"
  dir="${dir##*/}"
  echo Build lib : ${dir}
  echo ===========
  npm run build:${dir}:prod
done

for loc in fr-FR en-US
do
  echo ==================================================================================================
  echo Build website ${loc}
  echo ==================================================================================================
  npm run build:website:prod:${loc}
done

echo ==================================================================================================
echo Copy index.html to website root
echo ==================================================================================================
cp resources/index.html dist/website/index.html

echo ==================================================================================================
echo Copy 404.html to website root
echo ==================================================================================================
cp resources/404.html dist/website/404.html

echo ==================================================================================================
echo Copy CNAME to website root
echo ==================================================================================================
cp resources/CNAME dist/website/CNAME
