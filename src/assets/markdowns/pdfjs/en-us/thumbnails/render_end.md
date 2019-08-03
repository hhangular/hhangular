```html
<!--In template-->
<pdfjs-thumbnails  (render)="renderHandler($event)"> </pdfjs-thumbnails>
```

```typescript
// In controller
renderHandler($event: RenderEvent) {
   console.log(`${JSON.stringify($event)}`;);
}
```
