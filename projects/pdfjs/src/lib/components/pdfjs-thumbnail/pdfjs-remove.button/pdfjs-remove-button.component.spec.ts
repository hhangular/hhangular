import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {PdfjsRemoveButtonComponent} from './pdfjs-remove-button.component';
import {PDFDocumentProxy} from 'pdfjs-dist';
import {PdfSource} from '../../../classes/pdfjs-objects';
import {PdfjsItem} from '../../../classes/pdfjs-item';

describe('PdfjsRemoveButtonComponent', () => {
  let component: PdfjsRemoveButtonComponent;
  let fixture: ComponentFixture<PdfjsRemoveButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PdfjsRemoveButtonComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfjsRemoveButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should raise removeItem event when clicked', (done: DoneFn) => {
    const item = new PdfjsItem({ pdfId: 'TEST', document: {} as PdfSource, pageIdx: 0, rotation: 0, documentProxy: {} as PDFDocumentProxy});
    component.item = item;
    component.removeItem.subscribe(pdfjsItem => {
      expect(pdfjsItem).toBe(item);
      done();
    });
    component.onClick();
  });

});
