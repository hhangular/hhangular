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
