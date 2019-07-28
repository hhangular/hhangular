# Gestion des utilisateurs

Par défaut les objets de configuration stocké dans le navigateur, le sont pour tous les utilisateurs utilisant ce même navigateur.

Si vous êtes dans un contexte ou plusieurs utilisateurs partagent le même poste, avec bien sûr un système d'authentification. 
Vous pouvez fournir à la librairie un identifiant utilisateur en déclarant un provider qui servira à discriminer les entrées dans le store.

## Configuration

Dans le module qui déclare le `StoreModule` **!!IMPORTANT!!**, déclarez un `provider` qui retourne un `Observable<string>`.
Cet `observable` retournera l'utilisateur courant. 

Ce `provider` sert un `Observable`, en effet le processus d'authentification est souvent lui même asynchrone. La `string` retournée identifie l'utilisateur.

Utilisez le `InjectionToken` `USER_ID`, de `@hhangular/store` pour définir le nouveau `provider`.

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


