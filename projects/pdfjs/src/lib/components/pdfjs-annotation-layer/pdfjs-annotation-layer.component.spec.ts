import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfjsAnnotationLayerComponent } from './pdfjs-annotation-layer.component';

describe('PdfjsAnnotationLayerComponent', () => {
  let component: PdfjsAnnotationLayerComponent;
  let fixture: ComponentFixture<PdfjsAnnotationLayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfjsAnnotationLayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfjsAnnotationLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
