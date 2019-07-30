# Use

The use of decorators: `LocalStored` and `SessionStored` is very simple.

## Use cases
In the following example, we'll set up a configuration object for a table, 
which we would like, the columns displayed and the sorting of columns are backed up in the browser.     
Whether the user changes route (`angular` mechanism), reloads the page or even returns to the page after closing the browser.        
In all these cases the user will find the table as he had left it. This beyond the session.  

Of course we could save this on the server. But it's so much simpler like that. 

---

In a component just annotate a class attribute as follows:

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

  // ================= ANNOTATED ATTRIBUTE =================
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

## LocalStored or SessionStored

The difference between the two `decorator` :

 - **LocalStored** : The object is stored in the browser beyond the session. 
 - **SessionStored** : The object is stored only for the time of the session. The time of the session depends on the setting of the server. 

The annotation `LocalStore` takes two parameters, a version number and an optional identifier. See below.

```typescript
@LocalStored(1)
config = {foo: 'bar'}

@LocalStored(1, 'ID')
config2 = {foo: 'bar'}
```

The annotation `SessionStore`, take zero or one argument, the identifier that is optional. See below.
 
```typescript
@SessionStored('ID')
config = {foo: 'bar'}
```
