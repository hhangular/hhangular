# Installation

Pour vous aidez à démarrer avec une nouvelle application, consultez [Angular CLI](https://cli.angular.io/).

Pour les applications existantes, suivez les étapes suivantes pour commencer à utiliser `@hhangular/store` dans votre application. 

## Installer @hhangular/store

Vous pouvez utiliser indifféremment les outils de ligne de commandes `npm` ou `yarn` pour installer le `package`.   
Utilisez celui qui est approprié pour votre projet comme ci dessous.

### NPM

```bash
# @hhangular/store
npm install @hhangular/store --save 
```

### YARN

```bash
# @hhangular/store
yarn add @hhangular/store
```

## Configuration

Il suffit d'importer le module `StoreModule` et vous pourrez utiliser les `decorator`.   
Vous pouvez le faire dans votre `AppModule` ou dans votre `SharedModule` indifféremment.

`AppModule.ts`
```typescript
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
// ================= IMPORT =================
import {StoreModule} from '@hhangular/store';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
// ================= IMPORT =================
    StoreModule,
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
import {StoreModule} from '@hhangular/store';

@NgModule({
  imports: [
    CommonModule,
// ================= IMPORT =================
    StoreModule,
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
