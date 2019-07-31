# User management

By default, configuration objects stored in the browser are stored for all users using the same browser.

If you are in a context where several users share the same post, with of course an authentication system.   
You can provide to the library a user ID by declaring a provider that will be used to discriminate entry into the store.

## Configuration

In the module that declares the `StoreModule` **!!IMPORTANT!!** Declare a `provider` who returns an `Observable<string>`.
This 'observable' will return the current user. 

This `provider` serves as an `Observable`, in fact the authentication process is often itself asynchronous. The returned `string` identifies the user.

Use the `InjectionToken` `USER-ID` from '@hhangular/store' to define the new `provider`.

---

`AppModule.ts`
```typescript
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {BehaviorSubject} from 'rxjs';
// ================= NOTEZ L'IMPORT DE USER_ID =================
import {StoreModule, USER_ID} from '@hhangular/store';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
// ================= LE MODULE EST IMPORTE ICI =================
    StoreModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    // ================= PROVIDER =================
    {provide: USER_ID, useFactory: () => {
      // içi vous accéderez à votre service d'authentification 
      // pour récupérer l'utilisateur courant. 
      return new BehaviorSubject<string>('currentUser');
    }},
  ]
})
export class AppModule {
}
```


