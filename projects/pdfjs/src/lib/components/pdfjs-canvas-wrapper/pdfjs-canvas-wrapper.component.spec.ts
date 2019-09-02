import {async, ComponentFixture, fakeAsync, flush, inject, TestBed} from '@angular/core/testing';

import {PdfjsCanvasWrapperComponent} from './pdfjs-canvas-wrapper.component';
import {pdfApiFactory} from '../../classes/pdfapi-factory';
import {PDF_API, PdfSource} from '../../classes/pdfjs-objects';
import {PdfjsControl} from '../../controls/pdfjs-control';
import {PdfApi} from '../../classes/pdfapi';

describe('PdfjsCanvasWrapperComponent', () => {
  let component: PdfjsCanvasWrapperComponent;
  let fixture: ComponentFixture<PdfjsCanvasWrapperComponent>;
  const source: PdfSource = 'base/test/assets/conditions.pdf';
  const workerSrc = 'base/test/assets/pdf.worker.js';
  let API: PdfApi;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PdfjsCanvasWrapperComponent],
      providers: [
        {provide: PDF_API, useFactory: pdfApiFactory}
      ]
    }).compileComponents();
  }));

  beforeEach(inject([PDF_API], (svc) => {
    API = svc;
    API.GlobalWorkerOptions.workerSrc = workerSrc;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfjsCanvasWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit startEvent', fakeAsync(() => {
    const spied = spyOn(component.startRender, 'emit');
    const pdfjsControl: PdfjsControl = new PdfjsControl();
    pdfjsControl.load(source, false).then(_ => {
      const item = pdfjsControl.getItemByIndex(0);
      component.item = item;
      fixture.detectChanges();
      expect(spied).toHaveBeenCalled();
    });
    flush();
  }));

});
