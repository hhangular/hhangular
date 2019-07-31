---
# Le Drag and Drop

La gestion du `drag&drop` se fait à partir de 2 attributs `dragMode` et `allowDrop`.

 - `dragMode` définit le comportement du déplacement, si cela est une copie ou un déplacement.
 - `allowDrop` définit si le conteneur peut recevoir ou pas une miniature issue d'un `drag&drop`.

> Cela contrôle aussi la possibilité de réordonner les miniatures au sein d'un même `pdfjs-thumbnails`.

>>> **!!Attention!!** cela ne modifie pas le `PDF` il vous revient de récupérer la liste des pages modifiées et de les envoyer au serveur pour modifier ou créer un nouveau `PDF`.


