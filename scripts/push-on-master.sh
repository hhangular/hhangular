#!/bin/bash
echo ==================================================================================================
echo Commit package-lock.json
echo ==================================================================================================
git commit -m "[ci skip]" package-lock.json

echo ==================================================================================================
echo Increase version of website and commit
echo ==================================================================================================
npm version patch
git commit -m "[ci skip]" package.json

echo ==================================================================================================
echo Push in current branch $TRAVIS_BRANCH
echo ==================================================================================================
git push https://$GITHUB_TOKEN:x-oauth-basic@github.com/$TRAVIS_REPO_SLUG.git $TRAVIS_BRANCH

echo ==================================================================================================
echo Set remote origin
echo ==================================================================================================
git config remote.origin.fetch "+refs/heads/*:refs/remotes/origin/*"

echo ==================================================================================================
echo get infos from remote
echo ==================================================================================================
git remote update
git fetch

echo ==================================================================================================
echo Checkout master
echo ==================================================================================================
git checkout master

echo ==================================================================================================
echo Merge $TRAVIS_BRANCH on master
echo ==================================================================================================
git merge $TRAVIS_BRANCH

echo ==================================================================================================
echo Push on master
echo ==================================================================================================
git push https://$GITHUB_TOKEN:x-oauth-basic@github.com/$TRAVIS_REPO_SLUG.git master

echo ==================================================================================================
echo Remove branch $TRAVIS_BRANCH
echo ==================================================================================================
#git push https://$GITHUB_TOKEN:x-oauth-basic@github.com/$TRAVIS_REPO_SLUG.git --delete $TRAVIS_BRANCH
