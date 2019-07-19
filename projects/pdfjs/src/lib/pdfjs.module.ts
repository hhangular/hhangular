import {CommonModule} from '@angular/common';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  CUSTOM_ELEMENTS_SCHEMA,
  EmbeddedViewRef,
  Injector,
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf
} from '@angular/core';
import {PdfjsControl} from './classes/pdfjs-control';
import {PdfjsConfig} from './classes/pdfjs-objects';
import {PdfjsCommonComponent} from './components/pdfjs-common.component';
import {PdfjsRemoveButtonComponent} from './components/pdfjs-thumbnail/pdfjs-remove.button/pdfjs-remove-button.component';
import {PdfjsThumbnailComponent} from './components/pdfjs-thumbnail/pdfjs-thumbnail.component';
import {PdfjsThumbnailsComponent} from './components/pdfjs-thumbnails/pdfjs-thumbnails.component';
import {PdfjsPreviewComponent} from './components/pdfjs-thumbnails/preview/pdfjs-preview.component';
import {PdfjsViewComponent} from './components/pdfjs-view/pdfjs-view.component';
import {KeysService} from './services/keys.service';
import {Pdfjs} from './services/pdfjs.service';
import {ThumbnailDragService} from './services/thumbnail-drag.service';

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
  ],
  providers: [
    Pdfjs,
    ThumbnailDragService,
    KeysService,
  ],
  entryComponents: [
    PdfjsCommonComponent, PdfjsThumbnailComponent, // dynamic component
  ], schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class PdfjsModule {
  public static forRoot(config: PdfjsConfig): ModuleWithProviders {
    return {
      ngModule: PdfjsModule,
      providers: [
        {provide: PdfjsConfig, useValue: config},
      ],
    };
  }

  /**
   * Constructor, prevent circular injection
   */
  constructor(@Optional() @SkipSelf() parentModule: PdfjsModule,
              private cfr: ComponentFactoryResolver,
              private defaultInjector: Injector,
              private appRef: ApplicationRef,
              config: PdfjsConfig,
  ) {
    if (parentModule) {
//      throw new Error(
//        'PdfjsBoxModule is already loaded. Import it in the AppModule only');
    }
    if (!PdfjsControl.API.GlobalWorkerOptions.workerSrc) {
      PdfjsControl.API.GlobalWorkerOptions.workerSrc = config.workerSrc;
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
