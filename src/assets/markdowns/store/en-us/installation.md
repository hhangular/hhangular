# Installation

For help getting started with a new Angular app, check out the [Angular CLI](https://cli.angular.io/).

For existing apps, follow these steps to begin using `@hhangular/store` in your Angular app.

## Installer @hhangular/store

You can use either the npm or yarn command-line tool to install the `package`.    
Use whichever is appropriate for your project in the examples below.

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

Just import the module `StoreModule` and you can use the `decorator`.   
You can do this in your `AppModule` or in your `SharedModule` indifferently.

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
