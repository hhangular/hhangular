```html
<pdfjs-thumbnails  [fitSize]="100"  [layout]="'horizontal'"> </pdfjs-thumbnails>
```

Or

```typescript
// In controller
ThumbnailLayout = ThumbnailLayout;
```

```html
<!--In template-->
<pdfjs-thumbnails  [fitSize]="100"  [layout]="ThumbnailLayout.HORIZONTAL"> </pdfjs-thumbnails>
```

The defaults are `100` for `fitSize` and `ThumbnailLayout.HORIZONTAL` for `layout`.

