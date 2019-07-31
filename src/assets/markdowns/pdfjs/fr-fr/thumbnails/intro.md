# `<pdfjs-thumbnails>`

Le composant `<pdfjs-thumbnails>` est le conteneur de miniatures d'un document `PDF`.


### Cas 1 : Un seul composant `<pdfjs-thumbnails>`

Dans le cas ou un seul `PDF` est affiché à un instant `t`. Ce composant doit avoir au minimum un `PdfjsControl` de définit.

Le `PdfjsControl` permet de contrôler le document `PDF`. 
Il fonctionne un peu de la même façon que les classes `FormControl`.

```html
<!--In template-->
<pdfjs-thumbnails [pdfjsControl]="pdfjsControl"> </pdfjs-thumbnails>
``` 

```typescript
// In controller
pdfjsControl: PdfjsControl = new PdfjsControl();

ngOnInit():void {
   this.pdfjsControl.load('assets/pdfs/guide.pdf');
}
```

### Cas 2 : Plusieurs composants `<pdfjs-thumbnails>`

Dans le cas ou plusieurs composants `<pdfjs-thumbnails>` cohabitent, 
il faut utiliser en plus un `PdfjsGroupControl`.    
Un peut de la même façon que les composants `FormGroupControl`.   
En effet il est nécessaire d'avoir un contrôle sur le conteneur qui est actif. La classe `PdfjsGroupControl` permet de gérer cela.

En clair vous voulez afficher 2 (ou plus) `PDF` en même temps, du moins leurs miniatures, mais un seul composant de visualisation `pdfjs-view`.    
Cela permet par exemple d'avoir un partie `PDF` source, où l'on va charger différent `PDF`, et une partie `PDF` en édition.    
Vous permettant de composer un nouveau `PDF` à partir des différentes sources.

```typescript
// In controller
pdfjsGroupControl: PdfjsGroupControl = new PdfjsGroupControl();
pdfjsControl1: PdfjsControl = new PdfjsControl();
pdfjsControl2: PdfjsControl = new PdfjsControl();

ngOnInit():void {
   this.pdfjsControl1.load('assets/pdfs/guide.pdf');
   this.pdfjsControl2.load('https://mydomain.com/assets/pdfs/other.pdf');
   this.pdfjsGroupControl.select(this.pdfjsControl1);
}
```

```html
<!--In template-->
<!-- Premier PDF -->
<pdfjs-thumbnails  [pdfjsControl]="pdfjsControl1"  [pdfjsGroupControl]="pdfjsGroupControl">
</pdfjs-thumbnails>
<!-- Deuxième PDF -->
<pdfjs-thumbnails  [pdfjsControl]="pdfjsControl2"  [pdfjsGroupControl]="pdfjsGroupControl">
</pdfjs-thumbnails>
``` 

