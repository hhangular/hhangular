# Overview
Cette librairie a été générée avec [Angular CLI](https://github.com/angular/angular-cli) version 8.0.x.

Vous pouvez lire comment [ici](https://angular.io/guide/creating-libraries)

## Ajouter la librairie Mozilla pdfjs dans vos applications angular sans effort

Cette librairie contient un module angular `PdfjsModule` qui contient une collection de composants.   
Ces composants permettent d'utiliser la librairie `Mozilla pdfjs` dans vos application `angular`.    

La [Librairie Mozilla PDF](http://mozilla.github.io/pdf.js/) permet de visualiser, manipuler des documents `PDF` dans vos applications __sans plugin, ni iframe__. Seulement écrit en `javascript`.



## Dépendances tierces

Ces dépendances tierces seront importées avec `@hhangular/pdfjs`

  - pdfjs-dist
  - @types/pdfjs-dist

## Composants principals

 - **pdfjsThumbnails** : Permet de manipuler les miniatures d'un document `PDF`.
 - **pdfjsView** : Permet de manipuler une page d'un document pdf, piloté généralement par `pdfjsThumbnails`.
