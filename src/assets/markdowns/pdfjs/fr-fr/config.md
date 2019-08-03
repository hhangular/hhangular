# Configuration

## PdfWorker

Ajoutez la dépendance `pdfworker` dans le fichier `angular.json` à la racine de votre projet `angular`.

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
              { 
                "glob": "*.*", 
                "input": "./node_modules/pdfjs-dist/cmaps", 
                "output": "/cmaps" 
              },
              ...
```

## PdfjsModule 

Dans le module utilisant `PdfjsModule`, importez le module `PdfjsModule` et configurez le worker précédemment ajouté.

```typescript
@NgModule({
...
imports: [
    BrowserModule,
    SharedModule,
// =============== WORKER =============== 
    PdfjsBoxModule.config({
      workerSrc: 'assets/pdf.worker.js',
      cMapUrl: 'assets/cmaps/',
      cMapPacked: true
    })
  ],
...
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

Le mieux est d'utiliser un `SharedModule` comme préconisé dans le guide de style `angular`.   
**Pensez bien à exporter le `PdfjsModule` dans celui ci.**   
Comme cela il vous suffit d'importer le `SharedModule` dans les autres modules.

```typescript
@NgModule({
  imports: [
    CommonModule,
// =============== WORKER =============== 
    PdfjsBoxModule.config({
      workerSrc: 'assets/pdf.worker.js',
      cMapUrl: 'assets/cmaps/',
      cMapPacked: true
    })
  ],
  exports: [
// =============== EXPORT IT =============== 
    PdfjsModule,
  ],
  declarations: [],
})
export class SharedModule {
}
```

C'est tout, vous pouvez utilisez les composants dans votre application `angular`.
