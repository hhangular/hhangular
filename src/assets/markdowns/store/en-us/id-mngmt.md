# Id management

If in the previous example the table configuration is linked to the 'TestDecoratorComponent' component, we sometimes want to be able to share a configuration between several components.

**!!Attention!!** this mechanism is not adapted to make components communicate with each other.

In the application that presents the documentation, this mechanism is used to save the chosen page viewed by the user as he changes his language.

The 'path' is backed up at the time of `routing`. When you change context by changing your `locale`, you end up at the root of the site.
The main module will read the `path` in the store via an attribute, and navigates to the right page.

The two classes are therefore no longer the same. One written in the browser and the other reads it.

To do this we can specify an `id` on the decorator in addition to the `version`.

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
  @LocalStored(2, 'CONFIG_TABLE') // ID used as a key in the blind
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

  // ================= ANNOTATED ATTRIBUTE =================
  @LocalStored(2, 'CONFIG_TABLE') // ID used as a key in the store
  config = {...};
...
}
```

Note that the initial values must be the same because the first component that writes in the store will be right.
