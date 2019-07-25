import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {PdfjsPreviewComponent} from './pdfjs-preview.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {PdfjsThumbnailComponent} from '../../pdfjs-thumbnail/pdfjs-thumbnail.component';
import {PdfjsRemoveButtonComponent} from '../../pdfjs-thumbnail/pdfjs-remove.button/pdfjs-remove-button.component';
import {PdfjsService} from '../../../services/pdfjs.service';
import {pdfApiFactory} from '../../../classes/pdfapi-factory';
import {PdfjsItem} from '../../../classes/pdfjs-item';
import {PDFDocumentProxy} from 'pdfjs-dist';
import {PdfSource} from '../../../classes/pdfjs-objects';
import {PdfApi} from '../../../classes/pdfapi';

describe('PdfjsPreviewComponent', () => {
  let component: PdfjsPreviewComponent;
  let fixture: ComponentFixture<PdfjsPreviewComponent>;
  const source: PdfSource = 'base/test/assets/conditions.pdf';
  const workerSrc = 'base/test/assets/pdf.worker.js';
  let API: PdfApi;
  let items: PdfjsItem[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
      ],
      declarations: [
        PdfjsPreviewComponent,
        PdfjsRemoveButtonComponent,
        PdfjsThumbnailComponent
      ],
      providers: [
        PdfjsService,
        {provide: 'PdfApi', useFactory: pdfApiFactory}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfjsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(inject(['PdfApi'], (svc) => {
    API = svc;
    API.GlobalWorkerOptions.workerSrc = workerSrc;
  }));

  beforeEach((done: DoneFn) => {
    items = [];
    return API.getDocument(source).promise.then((pdfDocumentProxy: PDFDocumentProxy) => {
      return Array.apply(null, {length: pdfDocumentProxy.numPages})
        .map((e: any, i: number) => {
          return new PdfjsItem(pdfDocumentProxy, source, source, i + 1, 0);
        });
    }).then(pdfItems => {
      items = pdfItems;
      done();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('2 items', inject(['PdfApi'], (svc) => {
    expect(items.length).toEqual(2);
  }));
});
