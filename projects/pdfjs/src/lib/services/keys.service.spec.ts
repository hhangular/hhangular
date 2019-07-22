import {TestBed} from '@angular/core/testing';
import {KeysService} from './keys.service';

describe('KeysService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      KeysService
    ]
  }));

  it('should be created', () => {
    const service: KeysService = TestBed.get(KeysService);
    expect(service).toBeTruthy();
  });
});
