import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfjsTextLayerComponent } from './pdfjs-text-layer.component';
import {pdfApiFactory} from '../../classes/pdfapi-factory';

describe('PdfjsTextLayerComponent', () => {
  let component: PdfjsTextLayerComponent;
  let fixture: ComponentFixture<PdfjsTextLayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfjsTextLayerComponent ],
      providers: [
        {provide: 'PdfApi', useFactory: pdfApiFactory}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfjsTextLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
