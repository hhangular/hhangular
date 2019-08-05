import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PdfjsCanvasWrapperComponent} from './pdfjs-canvas-wrapper.component';
import {pdfApiFactory} from '../../classes/pdfapi-factory';
import {PDF_API} from '../../classes/pdfjs-objects';

describe('PdfjsCanvasWrapperComponent', () => {
  let component: PdfjsCanvasWrapperComponent;
  let fixture: ComponentFixture<PdfjsCanvasWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PdfjsCanvasWrapperComponent],
      providers: [
        {provide: PDF_API, useFactory: pdfApiFactory}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfjsCanvasWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
