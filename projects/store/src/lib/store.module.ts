import {Inject, NgModule} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {USER_ID} from './common';
import {StoreService} from './store.service';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [CommonModule],
  providers: [
    {provide: USER_ID, useValue: new BehaviorSubject('')}
  ]
})
export class StoreModule {
  constructor(
    @Inject(USER_ID) userId$: Observable<string>
  ) {
    userId$.subscribe(u => StoreService.userId$.next(u));
  }
}
