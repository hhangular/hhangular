```html
<pdfjs-thumbnails  [dragMode]="'duplicate'"> </pdfjs-thumbnails>
```
Or more elegant

```typescript
// In controller
ThumbnailDragMode = ThumbnailDragMode;
```
```html
<!--In template-->
<pdfjs-thumbnails  [dragMode]="ThumbnailDragMode.DUPLICATE"> </pdfjs-thumbnails>
```

And

```html
<pdfjs-thumbnails [allowDrop]="true"></pdfjs-thumbnails>
```

The default of `dragMode` is `ThumbnailDragMode.DUPLICATE`.

The default of `allowDrop` is `false`.    
