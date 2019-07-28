# Utilisation

L'utilisation des `Decorator` : `LocalStored` et `SessionStored` est très simple.


## Cas d'utilisation
Dans l'exemple suivant, nous allons configurer un objet de configuration pour un tableau, 
dont nous voudrions que, les colonnes affichées et le tri des colonnes soient sauvegardés dans le navigateur.  

Ceci au delà de la session. Si l'utilisateur ferme le navigateur et l'ouvre les colonnes et le tri seront comme il les avait configuré précédemment.

Bien sùr nous pourrions sauvegarder cela sur le serveur. Mais c'est tellement plus simple comme cela. 

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

  // ================= ATTRIBUT ANNOTE =================
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

 - **LocalStored** : l'objet est stocké dans le navigateur au delà de la session. 
 - **SessionStored** : l'objet est stocké uniquement le temps de la session. Le temps de la session dépend du paramétrage du serveur. 

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

## Gestion de version (LocalStored)

### Répudiation

Comme vous l'aurez compris dès que l'objet sera modifié, celui ci sera stocké dans le navigateur.

L'accès à l'attribut servira l'objet stocké dans le navigateur.

Mais comment faire pour rendre le contenu du navigateur obsolete pour par exemple ajouter de nouvelles valeurs à la configuration sauvegardée.

Dans notre exemple, nous voulons ajouté maintenant un filtre persistant. 
 
Problème c'est toujours le contenu du navigateur qui sera maintenant servi lors de l'accès à l'objet définit par l'attribut `config`.
Même si vous modifiez le code, se sera toujours l'objet sauvegarder dans le navigateur qui sera servi. À moins de demander à tous les utilisateurs de vider le store du navigateur.  

Pour ce faire le `decorator` `LocalStored` possède un mécanisme de version. 
Modifier, incrémenter plus exactement, le numéro de version de la configuration présente dans les sources, rendra la configuration stocké dans le navigateur obsolète.

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

  // ================= ATTRIBUT ANNOTE =================
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

## Gestion des ids

Si dans l'exemple précédent la configuration du tableau est lié au composant `TestDecoratorComponent`, on veut pouvoir parfois partager une configuration entre plusieurs composants.

`Attention` ce mécanisme n'est pas adapter pour faire communiquer des composant entres eux.

Dans l'application qui présente la documentation, on se sert de ce mécanisme pour sauvegarder la page choisie visualisée par l'utilisateur au moment ou il change de langue.

La `path` est sauvegardé au moment du `routage`. Au changement de contexte en changeant de `locale`, on se retrouve à la racine du site.
le Module principale va lire le `path` dans le store via un attribut, et navigue vers la bonne page.

Les deux classes ne sont donc plus les mêmes. Une écrit dans le navigateur et l'autre y lit.

Pour ce faire on peut spécifier un `id` sur le décorateur en plus de la `version`.

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
  // ================= ATTRIBUT ANNOTE =================
  @LocalStored(2, 'CONFIG_TABLE') // Identifiant utilisé comme clé dans le store
  config = {...};
...
}
```
     
```typescript
import {Component} from '@angular/core';
import {Sort} from '@angular/material/sort';
import {LocalStored} from '@hhangular/store';

@Component({
  selector: 'app-test2-decorator',
  templateUrl: './test2-decorator.html',
  styleUrls: ['./test2-decorator.css'],
})
export class Test2DecoratorComponent {

  // ================= ATTRIBUT ANNOTE =================
  @LocalStored(2, 'CONFIG_TABLE') // Identifiant utilisé comme clé dans le store
  config = {...};
...
}
```

Notez qu'il faut que les valeurs initiales soient les même car le premier composant qui écrira dans le store aura raison.

## Ce qui marche et qui marche pas

Faisons un rapide tour de ce qui marche, et ce qui marche pas

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
  // ================= ATTRIBUT ANNOTE =================
  @LocalStored(2, 'CONFIG_TABLE') // Identifiant utilisé comme clé dans le store
  config = {data: 5, child: {subData: {value: 7}}, arr: ['', 5, {value: 0}, [6]]};
  
  updateStore() {
    // !! ne marche pas pour l'attribut direct, utiliser l'accesseur
    this.config = {data: 6}; // no ok
    // =================================
    this.config.data = 6; // ok
    this.config.child.subData.value = 8; // ok
    this.config.child.subData = {value: 6, test: 8}; // ok
    this.config.arr[2].value = 'a'; // ok
    // !! ne marche pas, utiliser splice
    this.config.arr[0] = 'a'; // no ok
    this.config.arr[3][0] = 9; // no ok
    // =================================
    this.config.arr.splice(0, 1, 'a'); // ok
    this.config.arr[3].splice(0, 1, 9);  // ok
    this.config.arr.push('a'); // ok
    this.config.arr.pop(); // ok
    this.config.arr.shift(); // ok
    this.config.arr.unshift('b'); // ok
    this.config.arr.fill(0, 2); // ok
    this.config.arr.sort(); // ok
    this.config.arr.copyWithin(0, 2); // ok
    this.config.arr.reverse(); // ok
  }
...
}
```
Voilà en gros tout marche excepté la modification de l'objet directement à la racine et la modification du contenu d'un `array` par son `index`
