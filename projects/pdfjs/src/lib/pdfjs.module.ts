import {CommonModule} from '@angular/common';
import {ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Inject, Injector, ModuleWithProviders, NgModule} from '@angular/core';
import {PDF_API, PdfjsConfig} from './classes/pdfjs-objects';
import {PdfjsCommonComponent} from './components/pdfjs-common.component';
import {PdfjsRemoveButtonComponent} from './components/pdfjs-thumbnail/pdfjs-remove.button/pdfjs-remove-button.component';
import {PdfjsThumbnailComponent} from './components/pdfjs-thumbnail/pdfjs-thumbnail.component';
import {PdfjsThumbnailsComponent} from './components/pdfjs-thumbnails/pdfjs-thumbnails.component';
import {PdfjsPreviewComponent} from './components/pdfjs-thumbnails/preview/pdfjs-preview.component';
import {PdfjsViewComponent} from './components/pdfjs-view/pdfjs-view.component';
import {KeysService} from './services/keys.service';
import {ThumbnailDragService} from './services/thumbnail-drag.service';
import {PdfApi} from './classes/pdfapi';
import {pdfApiFactory} from './classes/pdfapi-factory';
import { PdfjsCanvasWrapperComponent } from './components/pdfjs-canvas-wrapper/pdfjs-canvas-wrapper.component';
import { PdfjsTextLayerComponent } from './components/pdfjs-text-layer/pdfjs-text-layer.component';
import { PdfjsAnnotationLayerComponent } from './components/pdfjs-annotation-layer/pdfjs-annotation-layer.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    PdfjsCommonComponent,
    PdfjsThumbnailsComponent,
    PdfjsThumbnailComponent,
    PdfjsRemoveButtonComponent,
    PdfjsViewComponent,
    PdfjsPreviewComponent,
  ],
  declarations: [
    PdfjsCommonComponent,
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
    PdfjsCommonComponent, PdfjsThumbnailComponent, // dynamic component
  ]
})
export class PdfjsModule {
  public static config(config: PdfjsConfig): ModuleWithProviders {
    return {
      ngModule: PdfjsModule,
      providers: [
        {provide: PdfjsConfig, useValue: config},
      ],
    };
  }

  /**
   * Constructor
   */
  constructor(private cfr: ComponentFactoryResolver,
              private defaultInjector: Injector,
              private appRef: ApplicationRef,
              private config: PdfjsConfig = {
                workerSrc: 'assets/pdf.worker.js',
                cMapUrl: 'assets/cmaps/',
                cMapPacked: true
              },
              @Inject(PDF_API) private API: PdfApi
  ) {
    if (!this.API.GlobalWorkerOptions.workerSrc) {
      this.API.GlobalWorkerOptions.workerSrc = config.workerSrc;
      this.API.GlobalCMapOptions = {cMapUrl: config.cMapUrl, cMapPacked: config.cMapPacked};
    }
    this.addPdfjsCommonComponentToDom();
  }

  /**
   * add PdfjsCommonComponent to dom
   */
  private addPdfjsCommonComponentToDom() {
    if (!document.body.querySelector('pdfjs-common')) {
      const componentFactory = this.cfr.resolveComponentFactory(PdfjsCommonComponent);
      const componentRef: ComponentRef<PdfjsCommonComponent> = componentFactory.create(this.defaultInjector);
      this.appRef.attachView(componentRef.hostView);
      const componentElement = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
      document.body.appendChild(componentElement);
    }
  }
}
