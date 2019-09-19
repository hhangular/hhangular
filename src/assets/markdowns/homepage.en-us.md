## HHANGULAR

This project contains several additional modules for [Angular](https://angular.io)

They are mainly developed and maintained by [hhfrancois](https://github.com/hhfrancois).

This project and bookstores were generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.x.

You can read how here: [Setup](https://angular.io/guide/setup-local) and [Create library](https://angular.io/guide/creating-libraries).

The project, and libraries are open-source under MIT licenses.

Additional modules/libraries are:
 - [@hhangular/pdfjs](pdfjs) : an angular implementation of the very good PDF viewing library without plugin of `Mozilla` [pdf.js](https://mozilla.github.io/pdf.js/). 
 - [@hhangular/store](store) : a library to save component configuration in the browser's `store`.

[Npm](https://docs.npmjs.com) obliges, many third-party librairies are used, impossible to quote them all.   
All are thanked implicitly and more specifically [Angular](https://angular.io), [FontAwesome](https://fontawesome.com/), [Mozilla Pdf.js](https://mozilla.github.io/pdf.js/).
Which are the most consequential.

You can of course participate in the project and libraries.

 To proposing PRs : 
  - on the modules code
  - on translation files
  - on the site itself
  - on translation corrections
  - on a new translation
 
To participate you need a github account, and an IDE. For example [jetbrain idea](https://www.jetbrains.com/idea/?hhangular.hhdev.fr).

Make sure you have [Git](https://git-scm.com/downloads), [Nodejs v10](https://nodejs.org/en/download/) and  [Npmjs 6.9.0](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installés sur votre poste.   

After fork the project into your account, make a PRs by explaining as best as possible the reason for it.
 
Several npm scripts have been added to the `package.json` file to help with development.

## Development server

 - `npm run start:website:fr-fr` : launches the dev server in French. Navigate to `http://localhost:4200/fr-fr`.
 - `npm run start:website:en-us` : launches the dev server in English. Navigate to `http://localhost:4201/en-us`.
 - `npm run watch:store` : compile on the fly the library `@hhangular/store`.
 - `npm run watch:pdfjs` : compile on the fly the library `@hhangular/pdfjs`.
 
## Build

The project contains an app, corresponding to the site you are currently reading, 
as well as 'sub-projects' that correspond to libraries, angular modules.   
So there are several things to 'build'.

 - `npm run build:website:fr-fr` : to build the site in French. 
 The build result will be in the directory `dist/website/fr-fr`.
 - `npm run build:website:en-us` : to build the site in English. 
The build result will be in the directory `dist/website/en-us`.
 - `npm run build:pdfjs` : to build the library `@hhangular/pdfjs`. 
 The build result will be in the directory `dist/pdfjs`.
 - `npm run build:store` : to build the library `@hhangular/store`. 
 The build result will be in the directory `dist/store`.

## Build prod

Build scripts have their version `prod`.

 - `npm run build:website:prod:fr-fr`
 - `npm run build:website:prod:en-us`
 - `npm run build:pdfjs:prod`
 - `npm run build:store:prod`

## Build universal ssr (server side rendering)

Angular Universal has been set up on the project to enable server-side rendering

 - `npm run build:ssr` : Launches the server build scripts and builds the ssr version
 - `npm run serve:ssr` : Launch the server to serve the ssr pages

## Sitemap

The sitemap is dynamically generated at build in the destination directory of the site `dist/website`

It consists of 3 files, an index file and two url files (1 for each locale)

 - `npm run build:sitemap` : Build sitemap files

## Autre

The resources directory contains some files that must be included in the build.

 - `npm run copy:static` : Copy files

## extract i18n

The site uses the internationalization mechanism advocated by [Angular](https://angular.io/guide/i18n)

A command allows the `tokens` to be extracted

 - `npm run extract-i18n`
 
This command extracts `tokens` from the sources and writes them in `xlif` format in the `dist/local/messages.xlf` file.
After extraction,  it is necessary to update the files `src/local/messages.xx-xx.xlf` where `xx-xx` represents the local.

For now the site is made by default in French, 
extracting the `tokens` and completing the `src/local/message.en-us.xlf` file allows the site to be added in English.

For the addition of a new language, contact me via a [Issue github](https://github.com/hhangular/issues) for add what is needed, or do a PR.

## Running unit tests

As before, several projects, several scripts to launch unit tests via [Karma](https://karma-runner.github.io).
 
Tests are launched on the integration server [Travis-ci](https://travis-ci.org/hhangular/hhangular).
And the tests coverage collected on the website [codecov](https://codecov.io)
 - [pdfjs](https://codecov.io/gh/hhangular/hhangular/branch/pdfjs)
 - [store](https://codecov.io/gh/hhangular/hhangular/branch/store)

### Scripts 

 - `npm run test:website` : launches the tests of the site, there are few ... `Karma` opens a window to track results in real time.
 - `npm run test:website:ci` : launches site testing, in `Headless` silent mode for the integration server. 
This generates code coverage statistics in the directory `coverage/hhangular`.
 - `npm run test:pdfjs` : launches the `pdfjs` library tests, `Karma` opens a window to track the results in real time.
 - `npm run test:pdfjs:ci` : launches the `pdfjs` library tests, in `Headless` silent mode for the integration server. 
This generates code coverage statistics in the directory `coverage/pdfjs`.
 - `npm run test:store` : launches the `store` library tests, `Karma` opens a window to track the results in real time.
 - `npm run test:store:ci` : launches the `store` library tests, in `Headless` silent mode for the integration server. 
This generates code coverage statistics in the directory `coverage/store`.
  
## Running end-to-end tests

Here I have yet to push the thing. If anyone has any skills about it. He'll be the welcome.

 - `npm run e2e` : Launches `end-to-end` tests via [Protractor](http://www.protractortest.org/).
 - `npm run e2e:ci` : Launches `end-to-end` tests for IC via [Protractor](http://www.protractortest.org/).
