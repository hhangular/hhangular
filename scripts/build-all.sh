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

echo ==================================================================================================
echo Build website fr-FR
echo ==================================================================================================
npm run build:prod:fr-FR

echo ==================================================================================================
echo Build website en-US
echo ==================================================================================================
npm run build:prod:en-US

echo ==================================================================================================
echo Copy index.html to website root
echo ==================================================================================================
cp scripts/index.html dist/website/index.html

echo ==================================================================================================
echo Copy 404.html to website root
echo ==================================================================================================
cp scripts/404.html dist/website/404.html

