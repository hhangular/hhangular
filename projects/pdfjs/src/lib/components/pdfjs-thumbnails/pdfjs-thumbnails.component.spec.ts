import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {PdfjsThumbnailsComponent} from './pdfjs-thumbnails.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {PdfjsService} from '../../services/pdfjs.service';
import {pdfApiFactory} from '../../classes/pdfapi-factory';
import {PdfjsPreviewComponent} from './preview/pdfjs-preview.component';
import {PdfjsRemoveButtonComponent} from '../pdfjs-thumbnail/pdfjs-remove.button/pdfjs-remove-button.component';
import {PdfjsThumbnailComponent} from '../pdfjs-thumbnail/pdfjs-thumbnail.component';

describe('PdfjsThumbnailsComponent', () => {
  let component: PdfjsThumbnailsComponent;
  let fixture: ComponentFixture<PdfjsThumbnailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
      ],
      declarations: [
        PdfjsThumbnailsComponent,
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
    fixture = TestBed.createComponent(PdfjsThumbnailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
