import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {PdfjsThumbnailComponent} from './pdfjs-thumbnail.component';
import {PdfjsRemoveButtonComponent} from './pdfjs-remove.button/pdfjs-remove-button.component';
import {pdfApiFactory} from '../../classes/pdfapi-factory';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {PdfjsCanvasWrapperComponent} from '../pdfjs-canvas-wrapper/pdfjs-canvas-wrapper.component';

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
        PdfjsThumbnailComponent,
        PdfjsCanvasWrapperComponent
      ],
      providers: [
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
