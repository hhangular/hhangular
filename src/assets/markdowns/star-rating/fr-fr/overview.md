# Overview
Cette librairie a été générée avec [Angular CLI](https://github.com/angular/angular-cli) version 8.0.x.

Vous pouvez lire comment [ici](https://angular.io/guide/creating-libraries)

## Permettre aux utilisateurs de noter un element avec des étoiles   

Cette librairie contient un module angular `StarRatingModule` exposant un composant `StarRatingComponent`.   
Cela permet aux utilisateur de laisser une note (ranking) sur votre site/application

## Dépendances tierces

Aucune dépendance

## Composants

 - **StarRatingComponent** 
```html
<h2-star-rating [stars]="Nombre étoiles" 
                   [value]="Valeur initial"
                   (valueChange)="Changement de valeur" 
                   [size]="Taille des étoiles"
                   [disabled]="Est il besoin d'expliquer ?"></h2-star-rating>
```
