import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RedirectComponent} from './redirect.component';
import {RouterModule} from '@angular/router';
import {Component} from '@angular/core';


@Component({
  template: '',
  styles: [],
})
export class FooComponent {
}

@Component({
  template: '',
  styles: [],
})
export class BarComponent {
}

describe('RedirectComponent', () => {
  let fixture: ComponentFixture<RedirectComponent>;
  let component: RedirectComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([
          {path: 'foo', component: FooComponent},
          {path: 'main', component: BarComponent},
          {path: '**', component: RedirectComponent, data: {defaultRoute: 'main'}},
        ])
      ],
      declarations: [BarComponent, FooComponent, RedirectComponent],
      providers: []
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test getExpectedRoute', () => {
    const base = 'https:/hhangular.hhdev.fr';
    const referrer = 'https:/hhangular.hhdev.fr/en-us/pdfjs/overview';
    const res = component.getExpectedRoute(base, referrer);
    expect(res).toBe('pdfjs/overview');
  });
});
