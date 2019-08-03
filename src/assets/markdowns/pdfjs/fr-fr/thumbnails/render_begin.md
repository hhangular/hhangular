---
## L'événement `render`

Après le chargement d'un `PDF`, le composant `pdfjs-thumbnails` lève un événement `render`.

L'événement, l'objet levé est le suivant : 

```typescript
{
  "type": string, // le type de l'événement. 'START' ou 'PROGRESS' ou 'END'
  "page": number, // le numéro de la page concernée
  "pages": number, // le nombre de pages total
  "time": number // l'heure d'execution en milli-secondes
}   
```
