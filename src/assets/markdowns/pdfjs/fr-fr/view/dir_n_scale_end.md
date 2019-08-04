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
La valeur par défaut de `fit` est `ViewFit.VERTICAL`.

La valeur par défaut de `scale` est `1`.
