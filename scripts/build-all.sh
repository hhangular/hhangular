#!/bin/bash

echo ==================================================================================================
echo Build or install all libs in projects directory
echo ==================================================================================================
for dir in projects/*/; do
  dir="${dir%/}"
  dir="${dir##*/}"
#  if [[ $1 == ${dir} ]]; then
    echo Build lib : @hhangular/${dir}
    echo ===========
    npm run build:${dir}:prod
#  else
#    echo Install lib : @hhangular/${dir}
#    npm install --no-save @hhangular/${dir}
#  fi
done

for loc in fr-fr en-us; do
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

echo ==================================================================================================
echo Copy .nojekyll to website root
echo ==================================================================================================
cp resources/.nojekyll dist/website/.nojekyll

echo ==================================================================================================
echo Copy sitemap to website root
echo ==================================================================================================
cp resources/sitemap.xml dist/website/sitemap.xml
cp resources/sitemap-fr-fr.xml dist/website/sitemap-fr-fr.xml
cp resources/sitemap-en-us.xml dist/website/sitemap-en-us.xml
