import {TestBed} from '@angular/core/testing';

import {EventDocumentService} from './event-document.service';
import {ThumbnailDragService} from './thumbnail-drag.service';
import {KeysService} from './keys.service';

describe('EventDocumentService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ThumbnailDragService,
      KeysService,
      EventDocumentService,
    ]
  }));

  it('should be created', () => {
    const service: EventDocumentService = TestBed.get(EventDocumentService);
    expect(service).toBeTruthy();
  });
});
