import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {PdfjsPreviewComponent} from './pdfjs-preview.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {PdfjsThumbnailComponent} from '../../pdfjs-thumbnail/pdfjs-thumbnail.component';
import {PdfjsRemoveButtonComponent} from '../../pdfjs-thumbnail/pdfjs-remove.button/pdfjs-remove-button.component';
import {PdfjsService} from '../../../services/pdfjs.service';
import {pdfApiFactory} from '../../../classes/pdfapi-factory';
import {PdfjsItem} from '../../../classes/pdfjs-item';
import {PDFDocumentProxy} from 'pdfjs-dist';
import {PdfSource} from '../../../classes/pdfjs-objects';

describe('PdfjsPreviewComponent', () => {
  let component: PdfjsPreviewComponent;
  let fixture: ComponentFixture<PdfjsPreviewComponent>;

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
      ]}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfjsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    const source: PdfSource = 'assets/pdfs/guide.pdf';
  }
    this.API.getDocument(source).promise.then((pdfDocumentProxy: PDFDocumentProxy) => {
      [].push.apply(this.items, Array.apply(null, {length: pdfDocumentProxy.numPages})
        .map((e: any, i: number) => {
          const item: PdfjsItem = new PdfjsItem(pdfDocumentProxy, this.pdfId, source, i + 1, 0);
          this.itemEvent$.next({item, event: 'add', to: i});
          return item;
        }, Number));
      this.itemEvent$.next({item: null, event: 'endInit'});
      if (this.autoSelect) {
        this.selectFirst();
      }
    expect(component).toBeTruthy();
  });

});
