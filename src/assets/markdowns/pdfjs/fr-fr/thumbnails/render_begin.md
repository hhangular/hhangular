---
## L'événement `render`

Après le chargement d'un `PDF`, le composant `pdfjs-thumbnails` lève un événement `render`.

L'événement, l'objet levé est le suivant : 

```typescript
{
  "type": string, // le type de l'événement. Actuellement seulement `'END'`
  "pages": number, // le nombre de pages
  "time": number // le temps d'éxecution
}   
```
