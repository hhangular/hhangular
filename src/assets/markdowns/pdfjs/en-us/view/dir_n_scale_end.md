```html
<pdfjs-view  [fit]="'vertical'" [scale]="1"> </pdfjs-view>
```
Or
```typescript
// In controller
ViewFit = ViewFit;
```
```html
<!--In template-->
<pdfjs-view  [fit]="ViewFit.VERTICAL" [scale]="1"> </pdfjs-view>
```

The default value of `fit` is` ViewFit.VERTICAL`.

The default value of `scale` is` 1`.
