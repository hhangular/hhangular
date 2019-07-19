# pdfjs [![Build Status](https://travis-ci.org/hhangular/hhangular.svg?branch=master)](https://travis-ci.org/hhangular/hhangular)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.0.

It's a collection of components for angular 8x

###pdfjs

pdfjs is implementation of mozilla pdfjs for angular x. It contains some components for use easily the [mozilla pdf viewer pdfjs](https://github.com/mozilla/pdf.js).

### dependencies
  - pdfjs-dist
  - @types/pdfjs-dist

## installation

```
npm install @hhangular/pdfjs --save
```

## use

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

### In application module add PdfjsModule and configure worker

```typescript
@NgModule({
...
imports: [
    BrowserModule,
    PdfjsBoxModule.forRoot({workerSrc: 'assets/pdf.worker.js'})
  ],
...
  bootstrap: [AppComponent]
})
export class AppModule {
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
  
    

