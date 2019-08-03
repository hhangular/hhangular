import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {PdfjsThumbnailComponent} from './pdfjs-thumbnail.component';
import {PdfjsRemoveButtonComponent} from './pdfjs-remove.button/pdfjs-remove-button.component';
import {pdfApiFactory} from '../../classes/pdfapi-factory';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {PdfjsCanvasWrapperComponent} from '../pdfjs-canvas-wrapper/pdfjs-canvas-wrapper.component';
import {PDF_API} from '../../classes/pdfjs-objects';

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
        {provide: PDF_API, useFactory: pdfApiFactory}
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
