---
# Les attributs `layout` et `fitSize`

Les attributs `layout` et `fitSize` fonctionnent de concert.   

`layout` définit la disposition des miniatures.
 - `ThumbnailLayout.HORIZONTAL` : définit que les miniatures seront rangées horizontalement, de la gauche vers la droite.
 - `ThumbnailLayout.VERTICAL` : définit que les miniatures seront rangées verticalement, du haut vers le bas.
 
`fitSize` définit la taille en pixels et dépend du `layout`, 
 - pour un `layout` horizontal, cela détermine la hauteur `height` des miniatures.
 - pour un `layout` vertical, cela détermine la largeur `width` des miniatures.



