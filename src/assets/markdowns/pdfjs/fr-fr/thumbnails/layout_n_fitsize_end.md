```html
<pdfjs-thumbnails  [fitSize]="100"  [layout]="'horizontal'"> </pdfjs-thumbnails>
```

Ou

```typescript
// In controller
ThumbnailLayout = ThumbnailLayout;
```

```html
<!--In template-->
<pdfjs-thumbnails  [fitSize]="100"  [layout]="ThumbnailLayout.HORIZONTAL"> </pdfjs-thumbnails>
```

Les valeurs par défaut sont `100` pour `fitSize` et `ThumbnailLayout.HORIZONTAL` pour `layout`.

