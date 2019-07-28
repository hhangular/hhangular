import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {TestComponent} from './test.component';
import {USER_ID} from '../common';
import {BehaviorSubject, Observable} from 'rxjs';
import {StoreService} from '../store.service';

describe('Test LocalStored', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [TestComponent],
      providers: [
        {provide: USER_ID, useFactory: () => new BehaviorSubject('USER')}
      ]
    }).compileComponents().then(() => {
    });
  }));

  beforeEach(inject([USER_ID], (userId$: Observable<string>) => {
    userId$.subscribe(u => StoreService.userId$.next(u));
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));


  it('Test LocalStored', () => {
    component.local.foo = 6;
    const stored = JSON.parse(localStorage.getItem('USER_test0'));
    expect(component.local.foo).toEqual(6);
    expect(stored.foo).toEqual(6);
  });
});
describe('Test SessionStored', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [TestComponent],
      providers: [
        {provide: USER_ID, useFactory: () => new BehaviorSubject('USER')}
      ]
    }).compileComponents().then(() => {
    });
  }));

  beforeEach(inject([USER_ID], (userId$) => {
    userId$.subscribe(u => StoreService.userId$.next(u));
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));


  it('Test SessionStored', () => {
    component.session.foo = 6;
    const stored = JSON.parse(sessionStorage.getItem('USER_test'));
    expect(component.session.foo).toEqual(6);
    expect(stored.foo).toEqual(6);
    sessionStorage.clear();
  });
});
