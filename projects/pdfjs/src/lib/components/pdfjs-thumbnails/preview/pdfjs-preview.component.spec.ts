import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {PdfjsPreviewComponent} from './pdfjs-preview.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {PdfjsThumbnailComponent} from '../../pdfjs-thumbnail/pdfjs-thumbnail.component';
import {PdfjsRemoveButtonComponent} from '../../pdfjs-thumbnail/pdfjs-remove.button/pdfjs-remove-button.component';
import {PdfjsService} from '../../../services/pdfjs.service';
import {pdfApiFactory} from '../../../classes/pdfapi-factory';

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

});
