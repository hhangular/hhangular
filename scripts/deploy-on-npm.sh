#!/bin/bash
# $1 is set with the name of the library that you want to build : pdfjs, store...
echo ==================================================================================================
echo publish on npm $1, use authToken in .npmrc
echo ==================================================================================================
npm publish dist/$1

echo ==================================================================================================
echo Git status
echo ==================================================================================================
git status

echo ==================================================================================================
echo Set next number version
echo ==================================================================================================
cd projects/$1
npm version patch
cd ../..

echo ==================================================================================================
echo Git status
echo ==================================================================================================
git status

echo ==================================================================================================
echo Commit next number version
echo ==================================================================================================
git commit -m "[ci skip]" projects/$1/package.json
