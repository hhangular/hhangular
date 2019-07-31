Il n'y a pas grand chose à dire sur la partie HTML ou CSS, cela reprend quasiment l'exemple du site de `material`.

Dans le fichier HTML on peut constater le `binding` sur l'objet `config` aux lignes : `3, 36-37, 43`.

Sur la partie TS, pas de commentaire sur la partie inhérente à la librairie `material`, 
ni à celle de [fontAwesome](https://fontawesome.com/icons?d=gallery&m=free) qui sert pour les `Icons`.

Il n'est pas nécessaire non plus d'expliquer la partie `PeriodicElementService` qui va servir les données utilisées dans la table.   
Celle ci est expliquée dans la rubrique data du site `angular.io` [data](https://angular.io/start/data)

Aux lignes `25-31` est déclaré la configuration qui sera persistante.

```typescript
  @LocalStored(1)
  config = {
    sort: {active: null, direction: 'asc'},
    displayedColumns: ['position', 'name', 'weight', 'symbol'],
    pageIndex: 1,
    filter: null
  };
```

L'annotation `@LocalStored` définit que l'objet servit par l'attribut `config` sera persisté dans le `localStorage` du navigateur.

Le paramètre `1` de l'annotation définit que c'est la première version. Ce sera rarement le cas.   
En effet durant le développement, il est probable que vous ayez à modifier plusieurs fois la structure de l'objet que vous voulez persister.   
Aussi si vous ne voulez pas à chaque fois vider le store de votre navigateur. Vous aurez à incrementer la version de l'objet et rendre obsolète celui du store.

> À noter que cela n'a aucune importance si vous livrez avec une version autre que `1` alors que l'internaute n'a jamais persisté l'objet dans son store.

### Initialisation 

```typescript
  ngOnInit() {
    ...
    this.dataSource.sort.active = this.config.sort.active;
    this.dataSource.sort.direction = this.config.sort.direction as SortDirection;
    this.paginator.pageIndex = this.config.pageIndex;
    this.dataSource.filter = this.config.filter;
  }
```

Dans la méthode `ngOnInit`, on initialise le composant, c'est le moment de définir aux objets `material` les valeurs issues de la configuration.   
Comme vous pouvez le constater, il n'y a rien à faire de spécial pour aller lire les données issues du store.

On peut noter le `cast` de l'attribut `direction`, l'objet `material` n'acceptant que `'asc'`, `'desc'` et `''`.

### Choix des colonnes

```typescript
  switchColumn(column: string) {
    const index = this.config.displayedColumns.indexOf(column);
    if (index === -1) {
      this.config.displayedColumns.push(column);
      this.config.displayedColumns.sort((a: string, b: string) => {
        return this.columns.indexOf(a) - this.columns.indexOf(b);
      });
    } else {
      this.config.displayedColumns.splice(index, 1);
    }
  }
```

`switchColumn` est la méthode appelée que l'on active ou désactive une colonne.   
On vérifie que la colonne est visible ou pas.  
Si c'est pas le cas, on l'ajoute aux colonnes visibles, puis on tri les colonnes dans l'ordre initial.  
Si la colonne est déjà visible, on la cache.

### Tri des données

```typescript
  sortChange($event: Sort) {
    this.config.sort = $event;
  }
```

La méthode `sortChange` est appelée à chaque fois que le tri est modifié.   
L'objet de type `Sort` est directement définit sur l'objet `conf`.

> A noter que l'on aurait pu faire ceci : 

```typescript
  sortChange($event: Sort) {
    this.config.sort.active = $event.active;
    this.config.sort.direction = $event.direction;
  }
```

### Pagination

```typescript
  changePage($event: PageEvent) {
    this.config.pageIndex = $event.pageIndex;
  }
```

Ici encore c'est vraiment très simple, à chaque événement de pagination, on affecte le nouvel index de page, ce qui va automatiquement le persister dans le store du navigateur.

### Filtre

```html
<mat-form-field>
  <input matInput [(ngModel)]="config.filter" ...>
</mat-form-field>
```

Ici le `binding` est fait directement dans le template `HTML`.   
À chaque modification de la valeur saisie, la valeur est persister dans le store.   
De la même façon, au chargement c'est la valeur du store qui initialise (si elle existe) le champ de saisie.

```typescript
  applyFilter() {
    this.dataSource.filter = this.config.filter.trim().toLowerCase();
  }
```
La methode `applyFilter`, ne fait qu'appliquer le filtre à l'objet `dataSource`.

