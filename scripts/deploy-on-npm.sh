#!bin/bash
# $1 is set with the nam of the library that you want to build : pdfjs, autoconf...
echo ==================================================================================================
echo publish on npm $1, use authToken in .npmrc
echo ==================================================================================================
npm publish dist/$1

echo ==================================================================================================
echo Set next number version and commit
echo ==================================================================================================
cd projects/$1
npm version patch
cd ../..
git commit -m "[ci skip]" projects/$1/package.json
