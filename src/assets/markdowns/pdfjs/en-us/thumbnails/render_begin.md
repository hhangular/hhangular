---
## The event `render`

After loading a `PDF`, the component `pdfjs-thumbnails` raises a `render` event.

The event, the object raised is: 

```typescript
{
  "type": string, // The type of event. 'START'`or 'PROGRESS' or 'END'
  "page": number, // The page number concerned
  "pages": number, // The number of pages
  "time": number // Execution time in milli-seconds
}   
```
