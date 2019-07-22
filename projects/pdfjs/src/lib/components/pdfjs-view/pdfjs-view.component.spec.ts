import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {PdfjsViewComponent} from './pdfjs-view.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {PdfjsService} from '../../services/pdfjs.service';
import {pdfApiFactory} from '../../classes/pdfapi-factory';
import {KeysService} from '../../services/keys.service';

describe('PdfjsViewComponent', () => {
  let component: PdfjsViewComponent;
  let fixture: ComponentFixture<PdfjsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
      ],
      declarations: [
        PdfjsViewComponent,
      ],
      providers: [
        PdfjsService,
        KeysService,
        {provide: 'PdfApi', useFactory: pdfApiFactory}
      ]}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfjsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
