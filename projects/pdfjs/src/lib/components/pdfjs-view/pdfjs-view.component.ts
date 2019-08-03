import {ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, OnDestroy, ViewChild} from '@angular/core';
import {PDFPageProxy, PDFPageViewport} from 'pdfjs-dist';
import {Subscription} from 'rxjs';
import {flatMap} from 'rxjs/operators';
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
export class PdfjsViewComponent implements OnDestroy {

  size = 100;
  item: PdfjsItem = null;
  @Input()
  mouseWheelNav = true;
  @Input()
  keysNav = true;
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
  @ViewChild('page', {static: true})
  private pageRef: ElementRef;
  private timeStart = 0;
  private subscription: Subscription;
  private canvasWidth: number;
  private canvasHeight: number;
  private width: number;
  private height: number;
  private pdfjsControl: PdfjsControl;
  private innerFit: ViewFit = ViewFit.VERTICAL;
  private innerScale = 1;

  constructor(
    private elementRef: ElementRef,
    private keysService: KeysService) {
  }

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
      this.pdfjsControl = null;
    }
  }

  get fit(): ViewFit {
    return this.innerFit;
  }

  /**
   * Fit direction
   */
  @Input()
  set fit(fit: ViewFit) {
    if (this.innerFit !== fit) {
      this.innerFit = fit;
      this.computeSize();
    }
  }

  get scale(): number {
    return this.innerScale;
  }

  /**
   * Scale of page
   */
  @Input()
  set scale(scale: number) {
    if (this.innerScale !== scale) {
      this.innerScale = scale;
      this.computeSize();
    }
  }

  public ngOnDestroy() {
    this.unsubscribe();
  }

  public hasPageSelected(): boolean {
    return !!this.pdfjsControl ? !isNaN(this.pdfjsControl.getSelectedPageIndex()) : false;
  }

  /**
   * mousewheel
   */
  @HostListener('mousewheel', ['$event'])
  public onMouseWheel(event: WheelEvent) {
    if (!this.mouseWheelNav) {
      return;
    }
    if (this.pdfjsControl) {
      if (this.canvasHeight <= this.height) {
        if (event.deltaY > 0) { // next page
          event.preventDefault();
          this.pdfjsControl.selectNext();
        } else if (event.deltaY < 0) {
          event.preventDefault();
          this.pdfjsControl.selectPrevious();
        }
      }
      if (this.canvasWidth <= this.width) {
        if (event.deltaX > 0) { // next page
          event.preventDefault();
          this.pdfjsControl.selectNext();
        } else if (event.deltaX < 0) {
          event.preventDefault();
          this.pdfjsControl.selectPrevious();
        }
      }
    }
  }

  /**
   * set focus
   */
  @HostListener('click', ['$event'])
  public onFocus(event: MouseEvent) {
    if (this.keysNav && this.pdfjsControl) {
      event.stopPropagation();
      this.keysService.setPdfjsControl(this.pdfjsControl);
    }
  }

  onCanvasRender(obj: CanvasWrapperRenderEvent) {
    this.defineSizesFromCanvasSizes(obj.width, obj.height, this.quality);
    this.pdfPageProxy = obj.pdfPageProxy;
    this.viewport = obj.viewport;
//    this.logRenderTime();
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

  private setPdfjsGroupControl(pdfjsGroupControl: PdfjsGroupControl) {
    if (pdfjsGroupControl) {
      this.subscription = pdfjsGroupControl.selectedPdfjsControl$.pipe(
        flatMap((pdfjsControl: PdfjsControl) => {
          this.pdfjsControl = pdfjsControl;
          return pdfjsControl.selectedItem$;
        })
      ).subscribe((item: PdfjsItem) => this.setItem(item));
    } else {
      this.unsubscribe();
    }
  }

  private setPdfjsControl(pdfjsControl: PdfjsControl) {
    this.pdfjsControl = pdfjsControl;
    if (!!pdfjsControl) {
      this.subscription = pdfjsControl.selectedItem$.subscribe((item: PdfjsItem) => this.setItem(item));
    } else {
      this.unsubscribe();
    }
  }

  private setItem(item: PdfjsItem) {
    this.item = null;
    if (!!item) {
      this.item = new PdfjsItem({...item});
    }
    this.computeSize();
  }

  private logRenderTime() {
    const time = new Date().getTime() - this.timeStart;
    const s = Math.trunc(time / 1000);
    const ms = time - s * 1000;
    console.log(`Render page ${this.item.pageIdx}  in ${s}s ${ms}ms`);
  }

  private unsubscribe() {
    if (!!this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
