import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {PdfjsCommonComponent} from './pdfjs-common.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ThumbnailDragService} from '../services/thumbnail-drag.service';
import {KeysService} from '../services/keys.service';

describe('PdfjsCommonComponent', () => {
  let component: PdfjsCommonComponent;
  let fixture: ComponentFixture<PdfjsCommonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
      ],
      declarations: [
        PdfjsCommonComponent,
      ],
      providers: [
        ThumbnailDragService,
        KeysService
      ]}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfjsCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
