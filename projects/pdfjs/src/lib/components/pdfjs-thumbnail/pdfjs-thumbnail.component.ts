import {animate, state, style, transition, trigger} from '@angular/animations';
import {Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {BehaviorSubject, combineLatest, of, Subscription} from 'rxjs';
import {distinctUntilChanged, filter, flatMap, map} from 'rxjs/operators';
import {PdfjsControl} from '../../controls/pdfjs-control';
import {PdfjsGroupControl} from '../../controls/pdfjs-group-control';
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

  get item(): PdfjsItem {
    return this._item;
  }

  @Input()
  set item(item: PdfjsItem) {
    this.item$.next(item);
  }

  /**
   * Define the pdfjsGroupControl for thumbnail containers
   */
  @Input()
  set pdfjsGroupControl(pdfjsGroupControl: PdfjsGroupControl) {
    if (!!this.subOnPdfjsGroupControl) {
      this.subOnPdfjsGroupControl.unsubscribe();
    }
    if (!!pdfjsGroupControl) {
      this.subOnPdfjsGroupControl = pdfjsGroupControl.selectedPdfjsControl$.pipe(
        map((ctrl: PdfjsControl) => {
          return !!ctrl && ctrl === this._pdfjsControl;
        }),
      ).subscribe((containerIsSelected: boolean) => {
        this.containerIsSelected$.next(containerIsSelected);
      });
    }
  }

  /**
   * Define the pdfjsControl for this thumbnail container
   */
  @Input()
  set pdfjsControl(pdfjsControl: PdfjsControl) {
    this._pdfjsControl = pdfjsControl;
    if (!!this.subOnPdfjsControl) {
      this.subOnPdfjsControl.unsubscribe();
    }
    if (!!pdfjsControl) {
      this.subOnPdfjsControl = combineLatest(pdfjsControl.selectedItem$, this.item$).pipe(
        filter((items: PdfjsItem[]) => items.every(item => !!item)),
        map((items: PdfjsItem[]) => {
          return items[0] === items[1];
        })
      ).subscribe((itemIsSelected: boolean) => {
        this.itemIsSelected$.next(itemIsSelected);
      });
    }
  }

  @HostBinding('@thumbnailState')
  public state;
  @HostBinding('style.width')
  width = '10px';
  @HostBinding('style.height')
  height = '10px';
  @HostBinding('class.vertical')
  vertical = false;

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

  private _pdfjsControl: PdfjsControl;
  private _item: PdfjsItem;

  private item$: BehaviorSubject<PdfjsItem> = new BehaviorSubject<PdfjsItem>(null);
  private subOnPdfjsControl: Subscription;
  private itemIsSelected$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private subOnPdfjsGroupControl: Subscription;
  private containerIsSelected$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(
    private elementRef: ElementRef) {
  }

  @HostListener('@thumbnailState.done', ['$event.toState'])
  removeAnimationDone(toState: string) {
    if (toState === 'removed') {
      this.removeButtonClick.emit(this.item);
    }
  }

  getPadding() {
    return `${this.borderWidth}px`;
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

//  @HostListener('mouseover', ['$event'])
  mouseOver($event: MouseEvent) {
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
      this.showPreview.emit(Object.assign(this.item, rect));
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

  onClick(event: MouseEvent) {
    this.showPreview.emit(null);
    this.selectItem.emit(this.item);
  }

  removeIt($event) {
    this.state = 'removed';
  }

  ngOnInit() {
    this.item$.pipe(
      flatMap((item: PdfjsItem) => {
        return combineLatest([this.item$, item ? item.rotation$ : of(0)]);
      }),
      map((next: [PdfjsItem, number]) => {
        return {item: next[0], rotation: next[1]};
      }),
      distinctUntilChanged((x: { item: PdfjsItem, rotation: number }, y: { item: PdfjsItem, rotation: number }) => {
        return !this.isItemToRenderChanged(x, y);
      }),
    ).subscribe((next: { item: PdfjsItem, rotation: number }) => {
      this._item = next.item;
    });
    /**
     * Observe selection
     */
    combineLatest([this.containerIsSelected$, this.itemIsSelected$]).subscribe((next: boolean[]) => {
      this.elementRef.nativeElement.classList.remove('active');
      if (next.every((val: boolean) => val)) {
        this.elementRef.nativeElement.classList.add('active');
        if (this.inViewPort(this.elementRef.nativeElement.parentElement)) { // if pdfjs-thumbnails is intoView the selection impose to scroll to view it
          if (!!this.elementRef.nativeElement.scrollIntoViewIfNeeded) {
            this.elementRef.nativeElement.scrollIntoViewIfNeeded();
          } else if (!this.inViewPort(this.elementRef.nativeElement)) {
            this.elementRef.nativeElement.scrollIntoView();
          }
        }
      }
    });
  }

  private inViewPort(nativeElement: any): boolean {
    const rect = nativeElement.getBoundingClientRect();
    const inViewPort = (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth) &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
    return inViewPort;
  }

  ngOnDestroy() {
    if (this.subOnPdfjsControl) {
      this.subOnPdfjsControl.unsubscribe();
    }
    if (this.subOnPdfjsGroupControl) {
      this.subOnPdfjsGroupControl.unsubscribe();
    }
  }

  private isItemToRenderChanged(x: { item: PdfjsItem, rotation: number }, y: { item: PdfjsItem, rotation: number }) {
    return !(!x && !y) && (
      (!x && !!y) || (!!x && !y) ||
      this.isItemChanged(x.item, y.item) ||
      x.rotation !== y.rotation
    );
  }

  private isItemChanged(x: PdfjsItem, y: PdfjsItem) {
    const isChanged = !(!x && !y) && (
      (!x && !!y) || (!!x && !y) || x.pdfId !== y.pdfId || x.pageIdx !== y.pageIdx
    );
    return isChanged;
  }

  renderStart() {
    this.startRender.emit(this.item);
  }

  renderEnd() {
    this.vertical = this.layout !== ThumbnailLayout.HORIZONTAL;
    this.computeSize();
    this.endRender.emit(this.item);
  }
}
