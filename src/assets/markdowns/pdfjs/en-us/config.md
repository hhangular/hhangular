## Configuration

Add assets `pdfworker` in file `angular.json` at the root of your `angular` project.

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

## PdfjsModule 

In module using `PdfjsModule`, import the module `PdfjsModule` and configure the worker, previously added.

```typescript
@NgModule({
...
imports: [
    BrowserModule,
    SharedModule,
// =============== WORKER =============== 
    PdfjsBoxModule.config({workerSrc: 'assets/pdf.worker.js'})
  ],
...
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

The best way is use a `SharedModule` like is purposed in `angular` guide style.   
Think to export `PdfjsModule` from the `SharedModule`.   
Like this you have just to import `SharedModule` in others modules.

```typescript
@NgModule({
  imports: [
    CommonModule,
// =============== WORKER =============== 
    PdfjsModule.config({workerSrc: 'assets/pdf.worker.js'}),
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

That's all, you can use the components in your `angular` application.
