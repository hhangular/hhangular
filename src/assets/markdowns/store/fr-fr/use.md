# Utilisation

L'utilisation des `Decorator` : `LocalStored` et `SessionStored` est très simple.

## Cas d'utilisation
Dans l'exemple suivant, nous allons configurer un objet de configuration pour un tableau, 
dont nous voudrions que, les colonnes affichées et le tri des colonnes soient sauvegardés dans le navigateur.     
Que l'utilisateur change de route (mécanisme `angular`), recharge la page ou même revienne sur la page après avoir fermé le navigateur.    
Dans tous ces cas l'utilisateur retrouvera le tableau comme il l'avait laissé. Ceci au delà de la session. 

Bien sùr nous pourrions sauvegarder cela sur le serveur. Mais c'est tellement plus simple comme cela. 

---

Dans un composant annotez juste un attribut de classe comme suit :

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
  @LocalStored(1)
  config = {
    displayedColumns: ['col1', 'col2'], 
    sort: {active: null, direction: 'asc'}
  };
  
  columns: ['col1', 'col2', 'col3', 'col4'];
  
  displayColumn(colName: string) {
    const idx = this.config.displayedColumns.indexOf(colName);
    if (idx !== -1) {
      this.config.displayedColumns.push(colName);
    }
  }
  hideColumn(colName: string) {
    const idx = this.config.displayedColumns.indexOf(colName);
    if (idx !== -1) {
      this.config.displayedColumns.splice(idx, 1);
    }
  }
  sortData(sort: Sort) {
    this.config.sort.active = sort.active;
    this.config.sort.direction = sort.direction;
  }
...
}
```

## LocalStored ou SessionStored

La difference entre les deux `decorator` :

 - **LocalStored** : L'objet est stocké dans le navigateur au delà de la session. 
 - **SessionStored** : L'objet est stocké uniquement le temps de la session. Le temps de la session dépend du paramétrage du serveur. 

L'annotation `LocalStore`, prends deux arguments en paramètres, un numéro de version et un identifiant facultatif. Voir plus bas.

```typescript
@LocalStored(1)
config = {foo: 'bar'}

@LocalStored(1, 'ID')
config2 = {foo: 'bar'}
```

L'annotation `SessionStore`, prends zero ou un argument, l'identifiant qui est facultatif. Voir plus bas.
 
```typescript
@SessionStored('ID')
config = {foo: 'bar'}
```
