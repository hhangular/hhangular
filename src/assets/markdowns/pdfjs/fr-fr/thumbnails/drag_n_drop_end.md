```html
<pdfjs-thumbnails  [dragMode]="'duplicate'"> </pdfjs-thumbnails>
```
Ou plus élégant

```typescript
// In controller
ThumbnailDragMode = ThumbnailDragMode;
```
```html
<!--In template-->
<pdfjs-thumbnails  [dragMode]="ThumbnailDragMode.DUPLICATE"> </pdfjs-thumbnails>
```

Et 

```html
<pdfjs-thumbnails [allowDrop]="true"></pdfjs-thumbnails>
```

La valeur par défaut de `dragMode` est `ThumbnailDragMode.DUPLICATE`.

La valeur par défaut de `allowDrop` est `false`.    

