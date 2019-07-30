# Limitations

## What works and what doesn't

Let's take a quick tour of what works, and what doesn't

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
  @LocalStored(2, 'CONFIG_TABLE') // ID used as a key in the store
  config = {data: 5, child: {subData: {value: 7}}, arr: ['', 5, {value: 0}, [6]]};
  
  updateStore() {
    // !! doesn't work for direct attribute, use accessor
    this.config = {data: 6}; // no ok
    // =================================
    this.config.data = 6; // ok
    this.config.child.subData.value = 8; // ok
    this.config.child.subData = {value: 6, test: 8}; // ok
    this.config.arr[2].value = 'a'; // ok
    // !! doesn't work, use splice
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
This basically everything works except the modification of the object directly to the root and the change of the contents of a 'array' by its 'index'
