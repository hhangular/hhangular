# Installation

Pour vous aidez à démarrer avec une nouvelle application, consultez [Angular CLI](https://cli.angular.io/).

Pour les applications existantes, suivez les étapes suivantes pour commencer à utiliser `@hhangular/star-rating` dans votre application. 

## Installer @hhangular/star-rating

Vous pouvez utiliser indifféremment les outils de ligne de commandes `npm` ou `yarn` pour installer le `package`.   
Utilisez celui qui est approprié pour votre projet comme ci dessous.

### NPM

```bash
# @hhangular/star-rating
npm install @hhangular/star-rating --save 
```

### YARN

```bash
# @hhangular/star-rating
yarn add @hhangular/star-rating
```

## Configuration

Il suffit d'importer le module `StarRatingModule` et vous pourrez utiliser le `star-rating`.   
Vous pouvez le faire dans votre `AppModule` ou dans votre `SharedModule` indifféremment.

`AppModule.ts`
```typescript
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
// ================= IMPORT =================
import {StarRatingModule} from '@hhangular/star-rating';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
// ================= IMPORT =================
    StarRatingModule,
  ],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule {
}
```

--- 

`SharedModule.ts`
```typescript
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
// ================= IMPORT =================
import {StarRatingModule} from '@hhangular/star-rating';

@NgModule({
  imports: [
    CommonModule,
// ================= IMPORT =================
    StarRatingModule,
  ],
  exports: [
// ================= EXPORT =================
    StoreModule,
  ],
  declarations: [],
})
export class SharedModule {
}
```
