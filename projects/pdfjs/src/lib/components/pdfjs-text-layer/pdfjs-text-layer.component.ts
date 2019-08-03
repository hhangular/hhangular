import {Component, ElementRef, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {PDFPageProxy, PDFPageViewport, TextContent} from 'pdfjs-dist';
import {DOCUMENT} from '@angular/common';
import {PdfApi, TextLayerRenderTask} from '../../classes/pdfapi';
import {PDF_API} from '../../classes/pdfjs-objects';

@Component({
  selector: 'pdfjs-text-layer',
  template: `<div class="endOfContent"></div>`,
  styleUrls: ['./pdfjs-text-layer.component.scss']
})
export class PdfjsTextLayerComponent implements OnInit, OnDestroy {


  private innerViewport: PDFPageViewport;
  private innerPdfPageProxy: PDFPageProxy;
  private textLayerRenderTask: TextLayerRenderTask;


  constructor(@Inject(DOCUMENT) private document: Document,
              @Inject(PDF_API) private API: PdfApi,
              private elementRef: ElementRef) {
  }

  @Input()
  get viewport(): PDFPageViewport {
    return this.innerViewport;
  }

  set viewport(viewport: PDFPageViewport) {
    if (this.innerViewport !== viewport) {
      this.innerViewport = viewport;
      this.writeTextLayer();
    }
  }

  @Input()
  get pdfPageProxy(): PDFPageProxy {
    return this.innerPdfPageProxy;
  }

  set pdfPageProxy(pdfPageProxy: PDFPageProxy) {
    if (this.innerPdfPageProxy !== pdfPageProxy) {
      this.innerPdfPageProxy = pdfPageProxy;
      this.writeTextLayer();
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.cancelTextLayerRenderTask();
  }

  private cancelTextLayerRenderTask() {
    if (!!this.textLayerRenderTask && this.textLayerRenderTask.cancel) {
      this.textLayerRenderTask.cancel();
    }
  }

  private writeTextLayer() {
    this.cancelTextLayerRenderTask();
    if (!!this.viewport && !!this.pdfPageProxy) {
      const container = this.document.createDocumentFragment();
      this.pdfPageProxy.getTextContent().then((textContent: TextContent) => {
        this.textLayerRenderTask = this.API.renderTextLayer({
          textContent,
          container,
          viewport: this.viewport
        });
        this.textLayerRenderTask.promise.then(() => {
          this.clear();
          (this.elementRef.nativeElement as HTMLElement).insertBefore(container, this.elementRef.nativeElement.firstChild);
        }, (error: any) => {
          console.log('error', error);
          if (error.name !== 'RenderingCancelledException') {
            console.log('render textLayer error', error);
          }
        });
      });
    } else {
      this.clear();
    }
  }

  /**
   * Reset text layout
   */
  private clear() {
    this.elementRef.nativeElement.innerHTML = '<div class="endOfContent"></div>';
  }
}
