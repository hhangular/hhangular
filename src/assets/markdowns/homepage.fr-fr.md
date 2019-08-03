## HHANGULAR

Ce projet contient plusieurs modules additionnels pour [Angular](https://angular.io)

Ils sont principalement développés et maintenus par [hhfrancois](https://github.com/hhfrancois).

Ce projet et les librairies ont été généré avec [Angular CLI](https://github.com/angular/angular-cli) version 8.0.x.

Vous pouvez lire comment içi : [Setup](https://angular.io/guide/setup-local) et [Create library](https://angular.io/guide/creating-libraries).

Le projet, et les librairies sont open-sources sous licences MIT.

Les modules/librairies additionnels sont :
 - [@hhangular/pdfjs](pdfjs) : une implementation angular de la très bonne librairie de visualisation de PDF sans plugin de `Mozilla` [pdf.js](https://mozilla.github.io/pdf.js/). 
 - [@hhangular/store](store) : une librairie permettant de sauvegarder la configuration des composants dans le `store` du navigateur.

[Npm](https://docs.npmjs.com) oblige, beaucoup de librairies tierces sont utilisées, impossible de les citer toutes.   
Toutes sont remerciés implicitement et plus particulièrement [Angular](https://angular.io), [FontAwesome](https://fontawesome.com/), [Mozilla Pdf.js](https://mozilla.github.io/pdf.js/).
Qui sont les plus conséquentes.

Vous pouvez bien sûr participer au projet et librairies.

 En proposant des PRs : 
  - sur le code des modules
  - sur les fichiers de traduction
  - sur le site en lui même
  - sur des corrections de traduction
  - sur une nouvelle traduction
 
Pour participer il vous faut un compte github, et un IDE Par exemple [idea de jetbrain](https://www.jetbrains.com/idea/?hhangular.hhdev.fr).

Assurez vous d'avoir [Git](https://git-scm.com/downloads),  [Nodejs v10](https://nodejs.org/en/download/) et [Npmjs 6.9.0](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installés sur votre poste.   

Après avoir forké le projet dans votre compte, faite une PRs en expliquant au mieux la raison de celle ci.
 
Plusieurs scripts npm on été ajoutés au fichier `package.json` pour aider dans le développement.

## Development server


 - `npm run start:fr-FR` : lance le serveur de dev en Français. Naviguez vers `http://localhost:4200/fr-FR`.
 - `npm run start:en-US` : lance le serveur de dev en Anglais. Naviguez vers `http://localhost:4201/en-US`.
 
## Build

Le projet contient une application, correspondant au site que vous lisez actuellement, 
ainsi que des 'sous projets' qui correspondent aux librairies, modules angular.   
Il y a donc plusieurs choses à 'builder'.

 - `npm run build:fr-FR` : pour builder le site en Français. Le résultat du build se trouvera dans le répertoire `dist/website/fr-FR`.
 - `npm run build:en-US` : pour builder le site en Anglais. Le résultat du build se trouvera dans le répertoire `dist/website/en-US`.
 - `npm run build:pdfjs` : pour builder la librairie `@hhangular/pdfjs`. Le résultat du build se trouvera dans le répertoire `dist/pdfjs`.
 - `npm run build:store` : pour builder la librairie `@hhangular/store`. Le résultat du build se trouvera dans le répertoire `dist/store`.

## Build prod

Les scripts de build ont leur version `prod`.

 - `npm run build:prod:fr-FR`
 - `npm run build:prod:en-US`
 - `npm run build:pdfjs:prod`
 - `npm run build:prod:fr-FR`
 - `npm run build:store:prod`

## extract i18n

Le site utilise le mécanisme d'internationalisation préconisé par [Angular](https://angular.io/guide/i18n)

Un commande permet donc d'extraire les `tokens`

 - `npm run extract-i18n`
 
Cette commande extrait les `tokens` des sources et les écrit au format `xlif` dans le fichier `dist/locale/messages.xlf`.
Après l'extraction, il convient de mettre à jour les fichiers `src/locale/messages.xx-xx.xlf` où `xx-xx` représente la locale.

Pour l'instant le site est fait par défaut en Français, 
l'extraction des `tokens` et la complétion du fichier `src/locale/message.en-us.xlf` permet d'ajouter le site en anglais.

Pour l'ajout d'une nouvelle langue, me contacter via une [Issue github](https://github.com/hhangular/hhangular/issues) pour que je rajoute le nécessaire, ou faire une PR.

## Running unit tests

Comme précédemment, plusieurs projets, plusieurs scripts pour lancer les tests unitaire via [Karma](https://karma-runner.github.io).

Les tests sont lancés sur le serveur d'intégration [Travis-ci](https://travis-ci.org/hhangular/hhangular).
Et la couverture de test collectée sur le site [codecov](https://codecov.io)
 - [pdfjs](https://codecov.io/gh/hhangular/hhangular/branch/pdfjs)
 - [store](https://codecov.io/gh/hhangular/hhangular/branch/store)
 
### Scripts 

 - `npm run test` : lance les tests du site, il y en a peu... `Karma` ouvre une fenêtre pour suivre les résultat en temps réel.
 - `npm run test:ci` : lance les tests du site, en mode silencieux `Headless` pour le serveur d'intégration. 
Cela génère des statistique de couverture de code dans le repertoire `coverage/hhangular`.
 - `npm run test:pdfjs` : lance les tests de la librairie `pdfjs`, `Karma` ouvre une fenêtre pour suivre les résultat en temps réel.
 - `npm run test:ci:pdfjs` : lance les tests de la librairie `pdfjs`, en mode silencieux `Headless`pour le serveur d'intégration. 
Cela génère des statistique de couverture de code dans le repertoire `coverage/pdfjs`.
 - `npm run test:store` : lance les tests de la librairie `store`, `Karma` ouvre une fenêtre pour suivre les résultat en temps réel.
 - `npm run test:ci:store` : lance les tests de la librairie `store`, en mode silencieux `Headless` pour le serveur d'intégration. 
Cela génère des statistique de couverture de code dans le repertoire `coverage/store`.
  
## Running end-to-end tests

Ici je n'ai pas encore pousser la chose. Si quelqu'un à des compétences à ce sujet. Il sera le bien venu.

 - `npm run e2e` : Lance les test `end-to-end` via [Protractor](http://www.protractortest.org/).
 - `npm run e2e:ci` : Lance les test `end-to-end` pour le CI via [Protractor](http://www.protractortest.org/).

