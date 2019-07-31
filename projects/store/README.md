# Overview
This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.x.

You can read how [here](https://angular.io/guide/creating-libraries)

## Store your component configurations effortlessly

This library contains an angular module `StoreModule` that allows you to store values in the browser's `store`.   
This mainly allows a configuration to be associated with a `component`, with the component becoming statefull on the attributes considered.   
The configuration becomes persistent in different routes, or even a complete reloading of the page.   


## Persistence of configuration

 - To navigation, change of routes, change of module.
 - When reloading the page.
 - When the browser closes/opens.

### Peer dependence

No dependency

## Decorators

 - **LocalStored** is a `decorator` to annotate a 'field' of a class.   
This annotation tells him that the object stored in this variable will at the slightest change store in the browser's `localStorage`.   
At the next access, even after the page is reloaded, the value in the `localStorage` will be served.

- **SessionStored** is also a `decorator` with the same behavior as `LocalStored`, but the value will only be persisted for the time of the session.   
At the next access, as long as the session is active, the value in the `SessionStorage` will be served.

## Installation

For help getting started with a new Angular app, check out the [Angular CLI](https://cli.angular.io/).

For existing apps, follow these steps to begin using `@hhangular/store` in your Angular app.

## Installer @hhangular/store

You can use either the npm or yarn command-line tool to install the `package`.    
Use whichever is appropriate for your project in the examples below.

### NPM

```bash
# @hhangular/store
npm install @hhangular/store --save 
```

### YARN

```bash
# @hhangular/store
yarn add @hhangular/store
```

## Configuration

Just import the module `StoreModule` and you can use the `decorator`.   
You can do this in your `AppModule` or in your `SharedModule` indifferently.

`AppModule.ts`
```typescript
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
// ================= IMPORT =================
import {StoreModule} from '@hhangular/store';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
// ================= IMPORT =================
    StoreModule,
  ],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule {
}
```

--- 

`SharedModule.ts`
```typescript
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
// ================= IMPORT =================
import {StoreModule} from '@hhangular/store';

@NgModule({
  imports: [
    CommonModule,
// ================= IMPORT =================
    StoreModule,
  ],
  exports: [
// ================= EXPORT =================
    StoreModule,
  ],
  declarations: [],
})
export class SharedModule {
}
```

# Use

The use of 'Decorator': `LocalStored` and `SessionStored` is very simple.

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

## Version management (LocalStored)

### Repudiation

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

## Id management

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

