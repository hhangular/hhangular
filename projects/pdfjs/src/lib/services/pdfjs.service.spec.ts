import { TestBed } from '@angular/core/testing';

import { PdfjsService } from '../pdfjs.service';

describe('PdfjsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PdfjsService = TestBed.get(PdfjsService);
    expect(service).toBeTruthy();
  });
});
