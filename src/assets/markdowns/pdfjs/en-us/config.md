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
    PdfjsModule.config({workerSrc: 'assets/pdf.worker.js'}),
  ],
  exports: [
    PdfjsModule,
  ],
  declarations: [],
})
export class SharedModule {
}
```
