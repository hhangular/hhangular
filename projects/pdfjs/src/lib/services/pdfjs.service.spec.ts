import {TestBed} from '@angular/core/testing';
import {PdfjsService} from './pdfjs.service';
import {PdfApi} from '../classes/pdfapi';
import {pdfApiFactory} from '../classes/pdfapi-factory';

describe('PdfjsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      PdfjsService,
      {provide: 'PdfApi', useValue: pdfApiFactory}
    ]
  }));

  it('should be created', () => {
    const service: PdfjsService = TestBed.get(PdfjsService);
    expect(service).toBeTruthy();
  });

  it('PDF API is available', () => {
    const service: PdfjsService = TestBed.get(PdfjsService);
    expect(service.getApi()).toBeTruthy();
  });
});
