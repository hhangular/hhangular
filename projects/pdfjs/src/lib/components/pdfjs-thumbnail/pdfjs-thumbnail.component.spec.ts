import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {PdfjsThumbnailComponent} from './pdfjs-thumbnail.component';
import {PdfjsRemoveButtonComponent} from './pdfjs-remove.button/pdfjs-remove-button.component';
import {PdfjsService} from '../../services/pdfjs.service';
import {pdfApiFactory} from '../../classes/pdfapi-factory';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('PdfjsThumbnailComponent', () => {
  let component: PdfjsThumbnailComponent;
  let fixture: ComponentFixture<PdfjsThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
      ],
      declarations: [
        PdfjsRemoveButtonComponent,
        PdfjsThumbnailComponent
      ],
      providers: [
        PdfjsService,
        {provide: 'PdfApi', useFactory: pdfApiFactory}
      ]}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfjsThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
