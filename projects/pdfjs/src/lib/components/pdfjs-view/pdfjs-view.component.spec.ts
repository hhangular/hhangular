import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {PdfjsViewComponent} from './pdfjs-view.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {pdfApiFactory} from '../../classes/pdfapi-factory';
import {KeysService} from '../../services/keys.service';
import {PdfSource} from '../../classes/pdfjs-objects';
import {PdfApi} from '../../classes/pdfapi';
import {PdfjsControl} from '../../controls/pdfjs-control';
import {PdfjsCanvasWrapperComponent} from '../pdfjs-canvas-wrapper/pdfjs-canvas-wrapper.component';
import {PdfjsTextLayerComponent} from '../pdfjs-text-layer/pdfjs-text-layer.component';

describe('PdfjsViewComponent', () => {
  let component: PdfjsViewComponent;
  let fixture: ComponentFixture<PdfjsViewComponent>;
  const source: PdfSource = 'base/test/assets/conditions.pdf';
  const workerSrc = 'base/test/assets/pdf.worker.js';
  let API: PdfApi;
  let pdfjsControl: PdfjsControl;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
      ],
      declarations: [
        PdfjsViewComponent,
        PdfjsCanvasWrapperComponent,
        PdfjsTextLayerComponent
      ],
      providers: [
        KeysService,
        {provide: 'PdfApi', useFactory: pdfApiFactory}
      ]}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfjsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(inject(['PdfApi'], (svc) => {
    API = svc;
    API.GlobalWorkerOptions.workerSrc = workerSrc;
  }));

  beforeEach(() => {
    pdfjsControl = new PdfjsControl();
    pdfjsControl.load(source, true);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('inject item', () => {
    component.control = pdfjsControl;
    expect(component).toBeDefined();
  });
});
