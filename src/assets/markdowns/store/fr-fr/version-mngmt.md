# Gestion de version (LocalStored)

## Répudiation

Comme vous l'aurez compris dès que l'objet sera modifié, celui ci sera stocké dans le navigateur.

L'accès à l'attribut servira l'objet stocké dans le navigateur.

Mais comment faire pour rendre le contenu du navigateur obsolète pour par exemple ajouter de nouvelles valeurs à la configuration sauvegardée.

Dans notre exemple, nous voulons ajouté maintenant un filtre persistant. 
 
Problème c'est toujours le contenu du navigateur qui sera maintenant servi lors de l'accès à l'objet définit par l'attribut `config`.   
Même si vous modifiez le code, se sera toujours l'objet du navigateur qui sera servi.    
À moins de demander à tous les utilisateurs de vider le store du navigateur...  

Pour ce faire le `decorator` `LocalStored` possède un mécanisme de version. 
Modifier, incrémenter plus exactement, le numéro de version de la configuration présente dans les sources, 
rendra la configuration stocké dans le navigateur obsolète.

Seul `LocalStored` possède ce mécanisme. `SessionStored` ne persistant que le temps de la session, cela n'est pas pertinent pour lui.

```typescript
import {Component} from '@angular/core';
import {Sort} from '@angular/material/sort';
import {LocalStored} from '@hhangular/store';

@Component({
  selector: 'app-test-decorator',
  templateUrl: './test-decorator.html',
  styleUrls: ['./test-decorator.css'],
})
export class TestDecoratorComponent {

  // ================= ATTRIBUT ANNOTÉ =================
  @LocalStored(2) // Numéro de version incrémenté
  config = {
    displayedColumns: ['col1', 'col2'], 
    sort: {active: null, direction: 'asc'}, 
    filter: null
  };
  
  columns: ['col1', 'col2', 'col3', 'col4'];
...
  filter(filter: string) {
    this.config.filter = filter;
  }
...
}
```
