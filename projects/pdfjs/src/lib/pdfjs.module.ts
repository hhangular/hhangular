import {CommonModule, DOCUMENT} from '@angular/common';
import {ApplicationRef, ComponentFactoryResolver, Inject, Injector, ModuleWithProviders, NgModule} from '@angular/core';
import {PDF_API, PdfjsConfig} from './classes/pdfjs-objects';
import {PdfjsRemoveButtonComponent} from './components/pdfjs-thumbnail/pdfjs-remove.button/pdfjs-remove-button.component';
import {PdfjsThumbnailComponent} from './components/pdfjs-thumbnail/pdfjs-thumbnail.component';
import {PdfjsThumbnailsComponent} from './components/pdfjs-thumbnails/pdfjs-thumbnails.component';
import {PdfjsPreviewComponent} from './components/pdfjs-thumbnails/preview/pdfjs-preview.component';
import {PdfjsViewComponent} from './components/pdfjs-view/pdfjs-view.component';
import {KeysService} from './services/keys.service';
import {ThumbnailDragService} from './services/thumbnail-drag.service';
import {PdfApi} from './classes/pdfapi';
import {pdfApiFactory} from './classes/pdfapi-factory';
import {PdfjsCanvasWrapperComponent} from './components/pdfjs-canvas-wrapper/pdfjs-canvas-wrapper.component';
import {PdfjsTextLayerComponent} from './components/pdfjs-text-layer/pdfjs-text-layer.component';
import {PdfjsAnnotationLayerComponent} from './components/pdfjs-annotation-layer/pdfjs-annotation-layer.component';
import {EventDocumentService} from './services/event-document.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    PdfjsThumbnailsComponent,
    PdfjsThumbnailComponent,
    PdfjsRemoveButtonComponent,
    PdfjsViewComponent,
    PdfjsPreviewComponent,
  ],
  declarations: [
    PdfjsThumbnailsComponent,
    PdfjsThumbnailComponent,
    PdfjsRemoveButtonComponent,
    PdfjsViewComponent,
    PdfjsPreviewComponent,
    PdfjsCanvasWrapperComponent,
    PdfjsTextLayerComponent,
    PdfjsAnnotationLayerComponent,
  ],
  providers: [
    ThumbnailDragService,
    KeysService,
    {provide: PDF_API, useFactory: pdfApiFactory}
  ],
  entryComponents: [
    PdfjsThumbnailComponent, // dynamic component
  ]
})
export class PdfjsModule {
  public static config(config: PdfjsConfig): ModuleWithProviders {
    return {
      ngModule: PdfjsModule,
      providers: [
        EventDocumentService,
        {provide: PdfjsConfig, useValue: config},
      ],
    };
  }

  /**
   * Constructor
   */
  constructor(@Inject(DOCUMENT) private document: Document,
              private cfr: ComponentFactoryResolver,
              private defaultInjector: Injector,
              private appRef: ApplicationRef,
              private config: PdfjsConfig = {
                workerSrc: 'assets/pdf.worker.js',
                cMapUrl: 'assets/cmaps/',
                cMapPacked: true
              },
              @Inject(PDF_API) private API: PdfApi,
              private eventDocumentService: EventDocumentService,
  ) {
    if (!this.API.GlobalWorkerOptions.workerSrc) {
      this.API.GlobalWorkerOptions.workerSrc = config.workerSrc;
      this.API.GlobalCMapOptions = {cMapUrl: config.cMapUrl, cMapPacked: config.cMapPacked};
    }
    this.eventDocumentService.addEventListeners();
  }
}
