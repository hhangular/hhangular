# Overview
Cette librairie a été générée avec [Angular CLI](https://github.com/angular/angular-cli) version 8.0.x.

Vous pouvez lire comment [ici](https://angular.io/guide/creating-libraries)

## Stoker la configurations de ses composants sans effort

Cette librairie contient un module angular `StoreModule` vous permettant de stocker des valeurs dans les `store` du navigateur.

### Dépendances tierces

Aucune dépendance

### Décorateurs

 - **LocalStored** est un ``decorator`` permettant d'annoter un `field` d'une classe.
Cette annotation lui indique que l'objet stocké dans cette variable sera à la moindre modification stocker dans le `localStorage` du navigateur.
Au prochain accès de lecture, même après un rechargement de la page, c'est la valeur dans le `LocalStorage` qui sera servi.

 - **SessionStored** est aussi un `decorator` avec le même fonctionnement que `LocalStored`, mais la valeur ne sera persistée que le temps de la session.
Au prochain accès de lecture, tant que la session sera active, c'est la valeur dans le `SessionStorage` qui sera donc servi.

