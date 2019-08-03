There is not much to say about the HTML or CSS part, it almost takes the example of the site of `material`.

In the HTML file we can see the `binding` on the object `config` to the lines: `3, 36-37, 43`.

On the TS part, no comment on the part inherent in the `material` library, 
nor that of [fontAwesome](https://fontawesome.com/icons?d=gallery&m=free) which serves for 'Icons'.

There is also no need to explain the `PeriodicElementService` part that will serve the data used in the table.   
This is explained in the data section of the website `angular.io` [data](https://angular.io/start/data)

At the lines `25-31` is declared the configuration that will be persistent.

```typescript
  @LocalStored(1)
  config = {
    sort: {active: null, direction: 'asc'},
    displayedColumns: ['position', 'name', 'weight', 'symbol'],
    pageIndex: 1,
    filter: null
  };
```

The `@LocalStored` annotation defines that the object used by the `config` attribute will be persisted in the browser's `localStorage`.

The `1` setting of the annotation defines that this is the first version. This will rarely be the case.   
Indeed, during development, it is likely that you will have to change the structure of the object you want to persist several times.   
Also if you don't want to empty your browser's store every time. You will have to increment the version of the object and make the store version obsolete.

> Note that it doesn't matter if you deliver with a version other than `1` when the user has never persisted the object in his store.

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

In the `ngOnInit` method, the component is initiated, it is the time to define the values from the configuration to the `material` objects.   
As you can see, there is nothing special to do to go and read the data from the store.

We can note the `cast` of the `direction` attribute, the object `material` accepting only `asc`, `desc` and `''`.

### Choosing columns

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

`switchColumn` is the method called activating or disabling a column.   
We check whether the column is visible or not.  
If this is not the case, it is added to the visible columns, then the columns are sorted in the initial order.  
If the column is already visible, it is hidden.

### Sorting data

```typescript
  sortChange($event: Sort) {
    this.config.sort = $event;
  }
```

The `sortChange` method is called every time the sort is changed.   
The `Sort` object is directly defined on the `conf` object.

> Note that we could have done this: 

```typescript
  sortChange($event: Sort) {
    this.config.sort.active = $event.active;
    this.config.sort.direction = $event.direction;
  }
```

### Paging

```typescript
  changePage($event: PageEvent) {
    this.config.pageIndex = $event.pageIndex;
  }
```

Here again it's really very simple, with each pagination event, we assign the new page index, which will automatically persist it in the browser store.

### Filter

```html
<mat-form-field>
  <input matInput [(ngModel)]="config.filter" ...>
</mat-form-field>
```

Here the `binding` is done directly in the `HTML` template.   
With each change in the entered value, the value is persisting in the store.   
Similarly, at loading it is the value of the store that initiates (if it exists) the entry field.

```typescript
  applyFilter() {
    this.dataSource.filter = this.config.filter.trim().toLowerCase();
  }
```

The `applyFilter` method simply applies the filter to the `dataSource` object.

