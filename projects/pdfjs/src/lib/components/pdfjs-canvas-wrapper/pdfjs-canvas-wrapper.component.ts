import {Component, ElementRef, EventEmitter, HostBinding, Inject, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {CanvasWrapperRenderEvent, PDF_API, RenderQuality, ViewFit} from '../../classes/pdfjs-objects';
import {PdfApi} from '../../classes/pdfapi';
import {PdfjsItem} from '../../classes/pdfjs-item';
import {PDFPageProxy, PDFPageViewport, PDFPromise, PDFRenderTask} from 'pdfjs-dist';
import {BehaviorSubject, combineLatest, Subscription} from 'rxjs';
import {debounce, debounceTime, filter} from 'rxjs/operators';
import {DOCUMENT} from '@angular/common';

type GetScaleForFit = (size: number, viewport: PDFPageViewport) => number;

@Component({
  selector: 'pdfjs-canvas-wrapper',
  templateUrl: './pdfjs-canvas-wrapper.component.html',
  styleUrls: ['./pdfjs-canvas-wrapper.component.scss']
})
export class PdfjsCanvasWrapperComponent implements OnInit, OnDestroy {

  @Input()
  multiCanvas = false;
  @Output()
  endRender = new EventEmitter<CanvasWrapperRenderEvent>();
  @Output()
  startRender = new EventEmitter<PdfjsItem>();
  @HostBinding('style.width')
  width: string;
  @HostBinding('style.height')
  height: string;
  @HostBinding('class.not_rendered')
  notRendered = true;
  private fit$: BehaviorSubject<ViewFit> = new BehaviorSubject<ViewFit>(ViewFit.VERTICAL);
  private size$: BehaviorSubject<number> = new BehaviorSubject<number>(90);
  private item$: BehaviorSubject<PdfjsItem> = new BehaviorSubject<PdfjsItem>(null);
  private quality$: BehaviorSubject<RenderQuality> = new BehaviorSubject<RenderQuality>(2);
  private scale$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  private pdfRenderTask: PDFRenderTask;
  private subRender: Subscription;

  constructor(@Inject(DOCUMENT) private document: Document,
              @Inject(PDF_API) private API: PdfApi,
              private elementRef: ElementRef) {
  }

  @Input()
  set fit(fit: ViewFit) {
    this.fit$.next(fit);
  }

  @Input()
  set size(size: number) {
    this.size$.next(size);
  }

  @Input()
  set item(item: PdfjsItem) {
    this.item$.next(item);
  }

  @Input()
  set quality(quality: RenderQuality) {
    this.quality$.next(quality);
  }

  @Input()
  set scale(scale: number) {
    this.scale$.next(scale);
  }

  ngOnInit() {
    this.subRender = combineLatest(this.fit$, this.item$, this.size$, this.quality$, this.scale$)
      .pipe(
        filter((arr: any[]) => arr.every(val => !!val)),
        debounceTime(50)
      )
      .subscribe((data: [ViewFit, PdfjsItem, number, RenderQuality, number]) => {
        this.notRendered = true;
        this.startRender.emit(new PdfjsItem({...data[1]}));
        this.renderPdfjsPageToCanvas(...data);
      });
  }

  ngOnDestroy() {
    if (!!this.subRender) {
      this.subRender.unsubscribe();
    }
    this.cancelRenderTask();
    this.destroyCanvas();
  }

  private renderPdfjsPageToCanvas(fit: ViewFit, item: PdfjsItem, size: number, quality: RenderQuality, scale: number) {
    this.cancelRenderTask();
    this.getRenderFittedInCanvas(fit)(item, size, quality, scale)
      .then((canvasWrapperRenderEvent: CanvasWrapperRenderEvent) => {
        this.notRendered = false;
        this.pdfRenderTask = null;
        this.endRender.emit(canvasWrapperRenderEvent);
      }, (error: any) => {
        this.notRendered = true;
        this.pdfRenderTask = null;
        if (error.name !== 'RenderingCancelledException') {
          console.log('render error', error);
        }
      });
  }

  /**
   * Render page in canvas
   */
  private renderItemInCanvasFitted(item: PdfjsItem, size: number /*height or width*/,
                                   quality: RenderQuality, zoom: number,
                                   getScaleForFit: GetScaleForFit): PDFPromise<CanvasWrapperRenderEvent> {
    // for view or preview we use each time a new canvas
    // for thumbnails one canvas is enough
    if (this.multiCanvas) {
      this.destroyCanvas();
    }
    const canvas: HTMLCanvasElement = this.getCanvas();
    const canvasContext: CanvasRenderingContext2D = cleanCanvas(canvas);
    let viewport: PDFPageViewport;
    let pdfPageProxy: PDFPageProxy;
    return item.getPage().then((pageProxy: PDFPageProxy) => {
      pdfPageProxy = pageProxy;
      viewport = pageProxy.getViewport({scale: 1, rotation: item.rotation, dontFlip: false});
      const scaleForFit = getScaleForFit(size, viewport); // method.call is useless here, cause getScale has no scope
      viewport = this.factorViewport(viewport, zoom * scaleForFit); // pdfPageProxy.getViewport(zoomSelected * scaleForFit, item.rotation);
      this.setCanvasSizes(canvas, viewport, quality);
      this.pdfRenderTask = pageProxy.render({
        canvasContext,
        viewport: this.factorViewport(viewport, quality) // pdfPageProxy.getViewport(scaleForFit * quality * zoomSelected, item.rotation)
      });
      return this.pdfRenderTask.promise;
    }).then(() => {
      return {viewport, pdfPageProxy, height: canvas.height, width: canvas.width} as CanvasWrapperRenderEvent;
    });
  }

  /**
   * Cancel Render Task if it exist
   */
  private cancelRenderTask() {
    if (!!this.pdfRenderTask && this.pdfRenderTask.cancel) {
      this.pdfRenderTask.cancel();
    }
  }

  /**
   * Render page in canvas
   */
  private renderItemInCanvasVerticalFitted(item: PdfjsItem, height: number, quality: RenderQuality = 1, scale: number = 1): PDFPromise<CanvasWrapperRenderEvent> {
    return this.renderItemInCanvasFitted(item, height, quality, scale, getScaleForVerticalFit);
  }

  /**
   * Render page in canvas
   */
  private renderItemInCanvasHorizontalFitted(item: PdfjsItem, width: number, quality: RenderQuality = 1, scale: number = 1): PDFPromise<CanvasWrapperRenderEvent> {
    return this.renderItemInCanvasFitted(item, width, quality, scale, getScaleForHorizontalFit);
  }

  /**
   * Render page in canvas
   */
  private getRenderFittedInCanvas(fit: ViewFit): (item: PdfjsItem, size: number, quality?: RenderQuality, scale?: number) => PDFPromise<CanvasWrapperRenderEvent> {
    return (fit === ViewFit.VERTICAL) ? this.renderItemInCanvasVerticalFitted.bind(this) : this.renderItemInCanvasHorizontalFitted.bind(this);
  }

  /**
   * Facility for avoid to call getViewport to much
   */
  private factorViewport(viewPort: PDFPageViewport, factor: number): PDFPageViewport {
    const src: any = viewPort as any;
    if (factor === 1) {
      return viewPort;
    }
    return {
      height: src.height * factor, // 1000.0000000000001
      offsetX: src.offsetX * factor, // 0
      offsetY: src.offsetY * factor, // 0
      rotation: src.rotation, // 0
      scale: src.scale * factor, // 1.1877612510565732
      transform: src.transform.map((val: number) => val * factor), // [1.1877612510565732, 0, 0, -1.1877612510565732, 0, 1000.0000000000001],
      viewBox: src.viewBox,
      width: src.width * factor // 707.098039856611
    } as any as PDFPageViewport;
  }

  /**
   * Define sizes of canvas
   */
  private setCanvasSizes(canvas: HTMLCanvasElement, viewport: PDFPageViewport, quality: RenderQuality) {
    canvas.width = viewport.width * quality;
    canvas.height = viewport.height * quality;
    canvas.setAttribute('width', `${canvas.width}px`);
    canvas.setAttribute('height', `${canvas.height}px`);
    canvas.style.width = `${viewport.width}px`;
    canvas.style.height = `${viewport.height}px`;
    this.width = `${viewport.width}px`;
    this.height = `${viewport.height}px`;
  }

  /**
   * Destroy canvas : clean and remove
   */
  private destroyCanvas() {
    const wrapper: HTMLDivElement = this.elementRef.nativeElement;
    if (wrapper.children.length) {
      const canvas: HTMLCanvasElement = wrapper.children.item(0) as HTMLCanvasElement;
      if (!!canvas) {
        cleanCanvas(canvas);
        canvas.remove();
      }
    }
  }

  /**
   * Get current canvas : clean and remove
   */
  private getCanvas(): HTMLCanvasElement {
    const wrapper: HTMLDivElement = this.elementRef.nativeElement;
    if (wrapper.children.length) {
      return wrapper.children.item(0) as HTMLCanvasElement;
    } else {
      return this.elementRef.nativeElement.appendChild(this.document.createElement('canvas'));
    }
  }

}

/**
 * Clean canvas, return ctx after
 */
function cleanCanvas(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width || 0, canvas.height || 0);
  return ctx;
}

/**
 * Compute scale for vertical fitSelected thumbnail container
 */
function getScaleForVerticalFit(height: number, viewport: PDFPageViewport): number {
  return height / viewport.height;
}

/**
 * Compute scale for horizontal fitSelected thumbnail container
 */
function getScaleForHorizontalFit(width: number, viewport: PDFPageViewport): number {
  return width / viewport.width;
}
