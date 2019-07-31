# Limitations
## Ce qui marche et ce qui ne marche pas

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
  // ================= ATTRIBUT ANNOTÉ =================
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

>> Voilà en gros tout marche excepté la modification de l'objet directement à la racine et la modification du contenu d'un `array` par son `index`
