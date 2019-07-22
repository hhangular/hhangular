import {TestBed} from '@angular/core/testing';
import {ThumbnailDragService} from './thumbnail-drag.service';

describe('ThumbnailDragService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ThumbnailDragService
    ]
  }));

  it('should be created', () => {
    const service: ThumbnailDragService = TestBed.get(ThumbnailDragService);
    expect(service).toBeTruthy();
  });
});
