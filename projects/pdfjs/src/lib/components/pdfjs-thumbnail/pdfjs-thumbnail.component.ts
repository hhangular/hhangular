import {animate, state, style, transition, trigger} from '@angular/animations';
import {Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {BehaviorSubject, combineLatest, Subscription} from 'rxjs';
import {filter, flatMap} from 'rxjs/operators';
import {PdfjsControl} from '../../controls/pdfjs-control';
import {RenderQuality, ThumbnailLayout, ViewFit} from '../../classes/pdfjs-objects';
import {PdfjsItem} from '../../classes/pdfjs-item';

@Component({
  selector: 'pdfjs-thumbnail',
  templateUrl: './pdfjs-thumbnail.component.html',
  styleUrls: ['./pdfjs-thumbnail.component.css'],
  animations: [
    trigger('thumbnailState', [
      state('removed', style({
        transform: 'scale(0)',
      })),
      state('active', style({
        backgroundColor: '#337ab7',
      })),
      transition('* => removed', animate('300ms ease-out')),
    ]),
  ],

})
export class PdfjsThumbnailComponent implements OnInit, OnDestroy {

  ThumbnailLayout = ThumbnailLayout;
  ViewFit = ViewFit;
  @HostBinding('@thumbnailState')
  state;
  @HostBinding('style.width')
  width = '10px';
  @HostBinding('style.height')
  height = '10px';
  /**
   * The Thumbnail end to render
   */
  @Output()
  endRender: EventEmitter<PdfjsItem> = new EventEmitter<PdfjsItem>();
  /**
   * The Thumbnail start to render
   */
  @Output()
  startRender: EventEmitter<PdfjsItem> = new EventEmitter<PdfjsItem>();
  /**
   * The Thumbnail has been over
   */
  @Output()
  showPreview: EventEmitter<PdfjsItem & DOMRect> = new EventEmitter<PdfjsItem & DOMRect>();
  /**
   * The button remove has been clicked
   */
  @Output()
  removeButtonClick: EventEmitter<PdfjsItem> = new EventEmitter<PdfjsItem>();
  /**
   * Select Item
   */
  @Output()
  selectItem: EventEmitter<PdfjsItem> = new EventEmitter<PdfjsItem>();
  @Input()
  quality: RenderQuality = 1;
  @Input()
  previewEnabled = false;
  @HostBinding('attr.draggable')
  @Input()
  draggable = false;
  @Input()
  removable = false;
  @HostBinding('style.padding')
  @Input()
  borderWidth = 5;
  @Input()
  fitSize = 90;
  @Input()
  layout = ThumbnailLayout.HORIZONTAL;
  @HostBinding('class.vertical')
  vertical = false;
  @HostBinding('class.active')
  selected = false;
  private subscription: Subscription;
  private containerIsSelected$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private pdfjsControl$: BehaviorSubject<PdfjsControl> = new BehaviorSubject<PdfjsControl>(null);
  private item$: BehaviorSubject<PdfjsItem> = new BehaviorSubject<PdfjsItem>(null);
  private innerItem: PdfjsItem;

  constructor(
    private elementRef: ElementRef) {
  }

  /**
   * Define the pdfjsControl for this thumbnail container
   */
  @Input()
  set pdfjsControl(pdfjsControl: PdfjsControl) {
    this.pdfjsControl$.next(pdfjsControl);
  }

  @Input()
  set containerIsSelected(isCurrent: boolean) {
    this.containerIsSelected$.next(isCurrent);
  }

  get item(): PdfjsItem {
    return this.innerItem;
  }

  @Input()
  set item(item: PdfjsItem) {
    this.innerItem = item;
    this.item$.next(item);
  }

  @HostListener('@thumbnailState.done', ['$event.toState'])
  removeAnimationDone(toState: string) {
    if (toState === 'removed') {
      this.removeButtonClick.emit(this.innerItem);
    }
  }

  @HostListener('mouseout', [])
  mouseOut() {
    this.showPreview.emit(null);
    const thumbnail: HTMLElement = this.elementRef.nativeElement;
    thumbnail.classList.remove('hover-right');
    thumbnail.classList.remove('hover-left');
    thumbnail.classList.remove('hover-bottom');
    thumbnail.classList.remove('hover-top');
  }

  getPadding() {
    return `${this.borderWidth}px`;
  }

  ngOnInit() {
    /**
     * Observe item & selection
     */
    this.subscription = this.pdfjsControl$.pipe(
      filter(pdfjsControl => !!pdfjsControl),
      flatMap(pdfjsControl => combineLatest(this.item$, pdfjsControl.selectedItem$, this.containerIsSelected$)),
    ).subscribe(([item, selected, containerIsSelected]) => {
      this.innerItem = item;
      this.selected = containerIsSelected && PdfjsItem.areEqual(item, selected);
      if (this.selected) {
        if (inViewPort(this.elementRef.nativeElement.parentElement)) { // if pdfjs-thumbnails is intoView the selection impose to scroll to view it
          if (!!this.elementRef.nativeElement.scrollIntoViewIfNeeded) {
            this.elementRef.nativeElement.scrollIntoViewIfNeeded();
          } else if (!inViewPort(this.elementRef.nativeElement)) {
            this.elementRef.nativeElement.scrollIntoView();
          }
        }
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  /**
   * Handlers
   */

  startRenderHandler() {
    this.startRender.emit(this.innerItem);
  }

  endRenderHandler() {
    this.vertical = this.layout !== ThumbnailLayout.HORIZONTAL;
    this.computeSize();
    this.endRender.emit(this.innerItem);
  }

  clickHandler() {
    this.showPreview.emit(null);
    this.selectItem.emit(this.innerItem);
  }

  removeItemHandler() {
    this.state = 'removed';
  }

  mouseoverHandler($event: MouseEvent) {
    if (this.previewEnabled) {
      const thumbnail: HTMLElement = this.elementRef.nativeElement;
      const rectList: DOMRectList = thumbnail.getClientRects() as DOMRectList;
      const r: DOMRect = rectList[0];
      let atLeft = false;
      let atTop = false;
      const left = Math.max($event.clientX - $event.offsetX, 0);
      const top = Math.max($event.clientY - $event.offsetY, 0);
      if ((left * 2) + r.width > window.innerWidth) {
        atLeft = true;
      }
      if ((top * 2) + r.height > window.innerHeight) {
        atTop = true;
      }
      // fix the problem with the collapsible scrollbar, the rect doesn't include scrollbar size
      // const width = this.layout === ThumbnailLayout.VERTICAL ? this.fitSize : r.width;
      // const height = this.layout === ThumbnailLayout.HORIZONTAL ? this.fitSize : r.height;
      const rect = {
        bottom: r.bottom, height: r.height, left: r.left, right: r.right,
        top: r.top, width: r.width, x: left, y: top,
        atLeft, atTop,
        toJSON: () => DOMRectReadOnly.prototype.toJSON.apply(this),
      };
      this.showPreview.emit(Object.assign(this.innerItem, rect));
    }
  }

  private computeSize() {
    if (this.layout === ThumbnailLayout.VERTICAL) {
      this.height = undefined;
      this.width = `${this.fitSize}px`;
    } else {
      this.height = `${this.fitSize}px`;
      this.width = undefined;
    }
  }

  private unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}

function inViewPort(nativeElement: any): boolean {
  const rect = nativeElement.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  );
}
