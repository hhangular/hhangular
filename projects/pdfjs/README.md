# @hhangular/pdfjs [![Build Status](https://img.shields.io/travis/hhangular/hhangular/pdfjs.svg?style=for-the-badge&logo=travis-ci)](https://travis-ci.org/hhangular/hhangular) 

## Full documentation available here : [hhangular/pdfjs](https://hhangular.hhdev.fr/en-US/pdfjs/overview)

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.0.

You can read how [here](https://angular.io/guide/creating-libraries)

This library contains an angular module PdfjsModule that contains a collection of components.

Components of PdfjsModule are implementation of mozilla pdfjs for angular 8x. 

It contains some components for use easily the [mozilla pdf viewer pdfjs](https://github.com/mozilla/pdf.js).

### dependencies
  - pdfjs-dist
  - @types/pdfjs-dist

## Installation

```
npm install @hhangular/pdfjs --save
```

## Configuration

Add assets pdfworker in angular.json

```json
{
  ...
  "projects": {
    "YOUR PROJECT": {
      ...
      "architect": {
        "build": {
          ...
          "options": {
            ...
            "assets": [
              { 
                "glob": "pdf.worker.js", 
                "input": "./node_modules/pdfjs-dist/build", 
                "output": "/assets" 
              },
              ...
```

### In modules using pdfModule, import PdfjsModule and configure worker

```typescript
@NgModule({
...
imports: [
    BrowserModule,
    SharedModule,
    PdfjsBoxModule.config({workerSrc: 'assets/pdf.worker.js'})
  ],
...
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

The best way is use SharedModule and export PdfjsModule. Like this you have just to import SharedModule in others modules.

```typescript
@NgModule({
  imports: [
    CommonModule,
    PdfjsModule.forRoot({workerSrc: 'assets/pdf.worker.js'}),
  ],
  exports: [
    PdfjsModule,
  ],
  declarations: [],
})
export class SharedModule {
}
```


### Components

  - pdfjs-thumbnails : Thumbnails of pdf
  - pdfjs-view  : A single page of pdf

### Control

  - PdfjsControl : Allow control pdf
  - PdfjsGroupControl : Allow control multi PdfjsControl

### objects

  - PdfPage : Represents a pdf page serialisable, usefull for implement features on backend
  
    

