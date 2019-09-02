import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {PdfjsViewComponent} from './pdfjs-view.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {pdfApiFactory} from '../../classes/pdfapi-factory';
import {KeysService} from '../../services/keys.service';
import {PDF_API, PdfSource} from '../../classes/pdfjs-objects';
import {PdfApi} from '../../classes/pdfapi';
import {PdfjsControl} from '../../controls/pdfjs-control';
import {PdfjsCanvasWrapperComponent} from '../pdfjs-canvas-wrapper/pdfjs-canvas-wrapper.component';
import {PdfjsTextLayerComponent} from '../pdfjs-text-layer/pdfjs-text-layer.component';

describe('PdfjsViewComponent', () => {
  let component: PdfjsViewComponent;
  let fixture: ComponentFixture<PdfjsViewComponent>;
  const source: PdfSource = 'base/test/assets/conditions.pdf';
  const workerSrc = 'base/test/assets/pdf.worker.js';
  let API: PdfApi;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
      ],
      declarations: [
        PdfjsViewComponent,
        PdfjsCanvasWrapperComponent,
        PdfjsTextLayerComponent
      ],
      providers: [
        KeysService,
        {provide: PDF_API, useFactory: pdfApiFactory}
      ]
    }).compileComponents();
  }));

  beforeEach(inject([PDF_API], (svc) => {
    API = svc;
    API.GlobalWorkerOptions.workerSrc = workerSrc;
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PdfjsViewComponent);
    component = fixture.componentInstance;
  }));

  /*
    beforeEach(() => {
      fixture = TestBed.createComponent(PdfjsViewComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  */

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('not init', () => {
    expect(component.control).toBeUndefined();
    expect(component.item).toBeUndefined();
  });

  it('inject pdfjsControl', async(() => {
    const pdfjsControl: PdfjsControl = new PdfjsControl();
    pdfjsControl.load(source, false);
    component.control = pdfjsControl;
    fixture.detectChanges();
    expect(component.item).toBeUndefined();
    expect(component.hasPageSelected()).toBeFalsy();
  }));

  /*
it('inject pdfjsControl with autoSelect', async((done) => {
  const pdfjsControl: PdfjsControl = new PdfjsControl();
  pdfjsControl.selectedIndex$.subscribe(() => {
    expect(component.item).toBeDefined();
    expect(component.hasPageSelected()).toBeTruthy();
    done();
  });
  pdfjsControl.load(source, true);
  component.control = pdfjsControl;
        const pdfjsControl: PdfjsControl = new PdfjsControl();
        component.endRender.subscribe(() => {
          console.log('=============', component.item, pdfjsControl.getItemByIndex(0));
          expect(component.item).toBe(pdfjsControl.getItemByIndex(0));
          expect(component.hasPageSelected()).toBeTruthy();
          done();
        });
        pdfjsControl.load(source, true);
        component.control = pdfjsControl;
        fixture.detectChanges();
        flush();
  }));
  */

  /*
    it('test startRender', () => {
      spyOn(component.startRender, 'emit');
      const pdfjsControl: PdfjsControl = new PdfjsControl();
      pdfjsControl.load(source, true);
      component.control = pdfjsControl;
      expect(component.startRender.emit).toHaveBeenCalled();
    });
  */

  /*
    it('test endRender', fakeAsync(() => {
      const spied = spyOn(component.endRender, 'emit');
      expect(spied).not.toHaveBeenCalled();
      const pdfjsControl: PdfjsControl = new PdfjsControl();
      pdfjsControl.load(source, true);
      component.control = pdfjsControl;
      fixture.detectChanges();
      flush();
      expect(spied).toHaveBeenCalled();
    }));
  */

  /*
    it('test size', fakeAsync(() => {
      const pdfjsControl: PdfjsControl = new PdfjsControl();
      pdfjsControl.load(source, true);
      component.control = pdfjsControl;

      fixture.detectChanges();
      flush();

      expect(component.size).toBe(100);
    }));
  */
});
