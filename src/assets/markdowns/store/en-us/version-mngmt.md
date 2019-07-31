# Version management (LocalStored)

## Repudiation

As you will have understood as soon as the object is changed, it will be stored in the browser.

Access to the attribute will serve the object stored in the browser.

But how do you make browser content obsolete, for example, add new values to the saved configuration.

In our example, we want to add now a persistent filter. 
 
Problem is always the content of the browser that will now be used when accessing the object defined by the attribute `config`.   
Even if you change the code, will still be the object from browser that will be served.    
Unless you ask all users to empty the browser store...  

To do this the `decorator` `LocalStored` has a version mechanism. 
Changing, incremating more accurately, the version number of the configuration presented in the sources, 
will make the configuration stored in the browser obsolete.

Only `LocalStored` has this mechanism. `SessionStored` only persists for the time of the session, this is not relevant to him.

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
  @LocalStored(2) // Incremented version number
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
