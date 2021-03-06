## HHANGULAR

Ce projet contient plusieurs modules additionnels pour [Angular](https://angular.io)

Ils sont principalement développés et maintenus par [hhfrancois](https://github.com/hhfrancois).

Ce projet et les librairies ont été généré avec [Angular CLI](https://github.com/angular/angular-cli) version 8.0.x.

Vous pouvez lire comment içi : [Setup](https://angular.io/guide/setup-local) et [Create library](https://angular.io/guide/creating-libraries).

Le projet, et les librairies sont open-sources sous licences MIT.

Les modules/librairies additionnels sont :
 - [@hhangular/pdfjs](pdfjs) : une implementation angular de la très bonne librairie de visualisation de PDF sans plugin de `Mozilla` [pdf.js](https://mozilla.github.io/pdf.js/). 
 - [@hhangular/store](store) : une librairie permettant de sauvegarder la configuration des composants dans le `store` du navigateur.
 - [@hhangular/star-rating](store) : un module incluant le composant `star-rating`.

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


 - `npm run start:website:fr-fr` : lance le serveur de dev en Français. Naviguez vers `http://localhost:4200/fr-fr`.
 - `npm run start:website:en-us` : lance le serveur de dev en Anglais. Naviguez vers `http://localhost:4201/en-us`.
 - `npm run watch:store` : compile à la volé la librairie `@hhangular/store`.
 - `npm run watch:pdfjs` : compile à la volé la librairie `@hhangular/pdfjs`.
 
## Build

Le projet contient une application, correspondant au site que vous lisez actuellement, 
ainsi que des 'sous projets' qui correspondent aux librairies, modules angular.   
Il y a donc plusieurs choses à 'builder'.

 - `npm run build:website:fr-fr` : pour builder le site en Français. 
 Le résultat du build se trouvera dans le répertoire `dist/website/fr-fr`.
 - `npm run build:website:en-us` : pour builder le site en Anglais. 
 Le résultat du build se trouvera dans le répertoire `dist/website/en-us`.
 - `npm run build:pdfjs` : pour builder la librairie `@hhangular/pdfjs`. 
 Le résultat du build se trouvera dans le répertoire `dist/pdfjs`.
 - `npm run build:store` : pour builder la librairie `@hhangular/store`. 
 Le résultat du build se trouvera dans le répertoire `dist/store`.
 - `npm run build:star-rating` : pour builder la librairie `@hhangular/star-rating`. 
 Le résultat du build se trouvera dans le répertoire `dist/star-rating`.

## Build prod

Les scripts de build ont leur version `prod`.

 - `npm run build:website:prod:fr-fr`
 - `npm run build:website:prod:en-us`
 - `npm run build:pdfjs:prod`
 - `npm run build:store:prod`
 - `npm run build:star-rating:prod`

## Build universal ssr (server side rendering)

Angular Universal a été mis en place sur le projet pour permettre le rendu coté serveur

 - `npm run build:ssr` : Lance les scripts de build du serveur, puis construit la version ssr
 - `npm run serve:ssr` : Lance le serveur pour servir les pages ssr

## Sitemap

Le sitemap est généré dynamiquement au build dans le repertoire de destination du site `dist/website`

Il est constitué de 3 fichiers, un fichier d'index et deux fichiers d'url (1 pour chaque locale)

 - `npm run build:sitemap` : Construit les fichiers de sitemap

## Autre

Le repertoire resources contient certains fichiers qui doivent être inclut dans le build. 

 - `npm run copy:static` : Copie les fichiers

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
 - [star-rating](https://codecov.io/gh/hhangular/hhangular/branch/star-rating)

### Scripts 

 - `npm run test:website` : lance les tests du site, il y en a peu... `Karma` ouvre une fenêtre pour suivre les résultat en temps réel.
 - `npm run test:website:ci` : lance les tests du site, en mode silencieux `Headless` pour le serveur d'intégration. 
Cela génère des statistique de couverture de code dans le repertoire `coverage/hhangular`.
 - `npm run test:pdfjs` : lance les tests de la librairie `pdfjs`, `Karma` ouvre une fenêtre pour suivre les résultat en temps réel.
 - `npm run test:pdfjs:ci` : lance les tests de la librairie `pdfjs`, en mode silencieux `Headless`pour le serveur d'intégration. 
Cela génère des statistique de couverture de code dans le repertoire `coverage/pdfjs`.
 - `npm run test:store` : lance les tests de la librairie `store`, `Karma` ouvre une fenêtre pour suivre les résultat en temps réel.
 - `npm run test:store:ci` : lance les tests de la librairie `store`, en mode silencieux `Headless` pour le serveur d'intégration. 
Cela génère des statistique de couverture de code dans le repertoire `coverage/store`.
 - `npm run test:star-rating` : lance les tests de la librairie `star-rating`, `Karma` ouvre une fenêtre pour suivre les résultat en temps réel. 
 - `npm run test:star-rating:ci` : lance les tests de la librairie `star-rating`, en mode silencieux `Headless` pour le serveur d'intégration.   
Cela génère des statistique de couverture de code dans le repertoire `coverage/star-rating`.
  
## Running end-to-end tests

Ici je n'ai pas encore pousser la chose. Si quelqu'un à des compétences à ce sujet. Il sera le bien venu.

 - `npm run e2e` : Lance les test `end-to-end` via [Protractor](http://www.protractortest.org/).
 - `npm run e2e:ci` : Lance les test `end-to-end` pour le CI via [Protractor](http://www.protractortest.org/).

