import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoStoreComponent } from './demo-store.component';

describe('DemoComponent', () => {
  let component: DemoStoreComponent;
  let fixture: ComponentFixture<DemoStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
