# Gestion des ids

Si dans l'exemple précédent la configuration du tableau est lié au composant `TestDecoratorComponent`, on veut pouvoir parfois partager une configuration entre plusieurs composants.

**!!Attention!!** ce mécanisme n'est pas adapter pour faire communiquer des composant entres eux.

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
  // ================= ATTRIBUT ANNOTATÉ =================
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

  // ================= ATTRIBUT ANNOTÉ =================
  @LocalStored(2, 'CONFIG_TABLE') // Identifiant utilisé comme clé dans le store
  config = {...};
...
}
```

Notez qu'il faut que les valeurs initiales soient les même car le premier composant qui écrira dans le store aura raison.
