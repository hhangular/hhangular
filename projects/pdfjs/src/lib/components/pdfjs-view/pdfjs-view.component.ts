import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, OnDestroy, ViewChild} from '@angular/core';
import {PDFPageProxy, PDFPageViewport} from 'pdfjs-dist';
import {BehaviorSubject, combineLatest, Subscription} from 'rxjs';
import {distinctUntilChanged, filter, flatMap, tap} from 'rxjs/operators';
import {PdfjsControl} from '../../controls/pdfjs-control';
import {PdfjsGroupControl} from '../../controls/pdfjs-group-control';
import {CanvasWrapperRenderEvent, RenderQuality, ViewFit} from '../../classes/pdfjs-objects';
import {KeysService} from '../../services/keys.service';
import {PdfjsItem} from '../../classes/pdfjs-item';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'pdfjs-view',
  templateUrl: './pdfjs-view.component.html',
  styleUrls: ['./pdfjs-view.component.css'],
})
export class PdfjsViewComponent implements OnDestroy, AfterViewInit {

  size = 100;
  item: PdfjsItem = null;

  @ViewChild('page', {static: true})
  private pageRef: ElementRef;

  private timeStart = 0;
  private subscription: Subscription;
  private observer: BehaviorSubject<[PdfjsItem, number]> = new BehaviorSubject<[PdfjsItem, number]>([null, 0]);
  private canvasWidth: number;
  private canvasHeight: number;
  private width: number;
  private height: number;
  private _pdfjsControl: PdfjsControl;
  private _fit: ViewFit = ViewFit.VERTICAL;
  private _scale: number;

  @Input()
  mouseWheelNav = true;

  @Input()
  keysNav = true;

  /**
   * PdfjsControl ou PdfjsGroupControl
   */
  @Input()
  set control(control: PdfjsControl | PdfjsGroupControl) {
    this.item = null;
    if (!!this.subscription) {
      this.subscription.unsubscribe();
    }
    this.keysService.clearPdfjsControl();
    if (control) {
      if (control instanceof PdfjsControl) {
        this.setPdfjsControl(control);
      } else {
        this.setPdfjsGroupControl(control);
      }
    } else {
      this._pdfjsControl = null;
    }
  }

  /**
   * Fit direction
   */
  @Input()
  set fit(fit: ViewFit) {
    if (this._fit !== fit) {
      this._fit = fit;
      this.computeSize();
    }
  }

  get fit(): ViewFit {
    return this._fit;
  }

  /**
   * Scale of page
   */
  @Input()
  set scale(scale: number) {
    if (this._scale !== scale) {
      this._scale = scale;
      this.computeSize();
    }
  }

  get scale(): number {
    return this._scale;
  }

  /**
   * Render quality
   */
  @Input()
  quality: RenderQuality = 2;

  /**
   * Render quality
   */
  @Input()
  textLayer: boolean;
  pdfPageProxy: PDFPageProxy;
  viewport: PDFPageViewport;

  constructor(
    private elementRef: ElementRef,
    private keysService: KeysService) {
  }

  public ngOnDestroy() {
  }

  public ngAfterViewInit(): void {
    this.observer.pipe(
      distinctUntilChanged((x: [PdfjsItem, number], y: [PdfjsItem, number]) => {
        return !(this.oneNull(x, y)
          || this.oneNull(x[0], y[0])
          || x[0].pdfId !== y[0].pdfId
          || x[0].pageIdx !== y[0].pageIdx
          || x[1] !== y[1]);
      }),
    ).subscribe((data: [PdfjsItem, number]) => {
      this.timeStart = new Date().getTime();
      this.item = data[0];
      this.computeSize();
    });
  }

  public hasPageSelected(): boolean {
    return !!this._pdfjsControl ? !isNaN(this._pdfjsControl.getSelectedPageIndex()) : false;
  }

  /**
   * Compute size function of fitSelected
   */
  private computeSize() {
    if (!!this.item) {
      const view: HTMLElement = this.elementRef.nativeElement;
      const clientRect: ClientRect = view.getBoundingClientRect();
      this.height = clientRect.height;
      this.width = clientRect.width;
      if (this.fit === ViewFit.HORIZONTAL) {
        this.size = this.width - 20;
      } else {
        this.size = this.height - 6;
      }
    }
  }

  private defineSizesFromCanvasSizes(width: number, height: number, quality: RenderQuality) {
    this.canvasWidth = width / quality;
    this.canvasHeight = height / quality;
    const heightPx = `${this.canvasHeight}px`;
    const widthPx = `${this.canvasWidth}px`;
    this.pageRef.nativeElement.style.height = heightPx;
    this.pageRef.nativeElement.style.width = widthPx;
  }

  @HostListener('style.height', ['$event'])
  onResize(event: Event) {
    console.log(event);
  }

  /**
   * mousewheel
   */
  @HostListener('mousewheel', ['$event'])
  public onMouseWheel(event: WheelEvent) {
    if (!this.mouseWheelNav) {
      return;
    }
    if (this._pdfjsControl) {
      if (this.canvasHeight <= this.height) {
        if (event.deltaY > 0) { // next page
          event.preventDefault();
          this._pdfjsControl.selectNext();
        } else if (event.deltaY < 0) {
          event.preventDefault();
          this._pdfjsControl.selectPrevious();
        }
      }
      if (this.canvasWidth <= this.width) {
        if (event.deltaX > 0) { // next page
          event.preventDefault();
          this._pdfjsControl.selectNext();
        } else if (event.deltaX < 0) {
          event.preventDefault();
          this._pdfjsControl.selectPrevious();
        }
      }
    }
  }

  /**
   * set focus
   */
  @HostListener('click', ['$event'])
  public onFocus(event: MouseEvent) {
    if (this.keysNav && this._pdfjsControl) {
      event.stopPropagation();
      this.keysService.setPdfjsControl(this._pdfjsControl);
    }
  }

  private setPdfjsGroupControl(pdfjsGroupControl: PdfjsGroupControl) {
    pdfjsGroupControl.selectedPdfjsControl$.pipe(
      tap((pdfjsControl: PdfjsControl) => {
        this._pdfjsControl = pdfjsControl;
      }),
      filter((pdfjsControl: PdfjsControl) => {
        return !!pdfjsControl;
      }),
      flatMap((pdfjsControl: PdfjsControl) => {
        return combineLatest([pdfjsControl.selectedItem$, pdfjsControl.rotation$]);
      }),
    ).subscribe((data: [PdfjsItem, number]) => {
      this.observer.next(data);
    });
  }

  private setPdfjsControl(pdfjsControl: PdfjsControl) {
    this._pdfjsControl = pdfjsControl;
    combineLatest([pdfjsControl.selectedItem$, pdfjsControl.rotation$]).pipe(
      filter((data: [PdfjsItem, number]) => {
        return !!data[0];
      }),
    ).subscribe((data: [PdfjsItem, number]) => {
      this.observer.next(data);
    });
  }

  onCanvasRender(obj: CanvasWrapperRenderEvent) {
    this.defineSizesFromCanvasSizes(obj.width, obj.height, this.quality);
    this.pdfPageProxy = obj.pdfPageProxy;
    this.viewport = obj.viewport;
    const time = new Date().getTime() - this.timeStart;
    const s = Math.trunc(time / 1000);
    const ms = time - s * 1000;
  }

  private bothNull(x, y) {
    return !x && !y;
  }

  private oneNull(x, y) {
    return !x || !y;
  }
}
