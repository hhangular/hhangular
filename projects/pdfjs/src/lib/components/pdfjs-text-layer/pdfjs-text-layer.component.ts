import {Component, ElementRef, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {PDFPageProxy, PDFPageViewport, TextContent} from 'pdfjs-dist';
import {DOCUMENT} from '@angular/common';
import {PdfApi, TextLayerRenderTask} from '../../classes/pdfapi';

@Component({
  selector: 'pdfjs-text-layer',
  template: `<div class="endOfContent"></div>`,
  styleUrls: ['./pdfjs-text-layer.component.scss']
})
export class PdfjsTextLayerComponent implements OnInit, OnDestroy {


  private _viewport: PDFPageViewport;
  private _pdfPageProxy: PDFPageProxy;
  private textLayerRenderTask: TextLayerRenderTask;


  constructor(@Inject(DOCUMENT) private document: Document,
              @Inject('PdfApi') private API: PdfApi,
              private elementRef: ElementRef) {
  }

  @Input()
  get viewport(): PDFPageViewport {
    return this._viewport;
  }

  set viewport(viewport: PDFPageViewport) {
    if (this._viewport !== viewport) {
      this._viewport = viewport;
      this.writeTextLayer();
    }
  }

  @Input()
  get pdfPageProxy(): PDFPageProxy {
    return this._pdfPageProxy;
  }

  set pdfPageProxy(pdfPageProxy: PDFPageProxy) {
    if (this._pdfPageProxy !== pdfPageProxy) {
      this._pdfPageProxy = pdfPageProxy;
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
