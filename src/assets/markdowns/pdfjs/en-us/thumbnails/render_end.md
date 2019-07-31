```html
<!--In template-->
<pdfjs-thumbnails  (render)="renderHandler($event)"> </pdfjs-thumbnails>
```

```typescript
// In controller
renderHandler($event: RenderEvent) {
   if ($event.type === 'END') {
      console.log(`${JSON.stringify($event)}`;);
   }
}
```
