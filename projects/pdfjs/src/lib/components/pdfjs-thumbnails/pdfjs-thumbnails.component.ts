import {
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {PdfjsControl} from '../../controls/pdfjs-control';
import {PdfjsGroupControl} from '../../controls/pdfjs-group-control';
import {PdfjsItem} from '../../classes/pdfjs-item';
import {PdfjsItemEvent, PdfjsItemEventType, RenderEvent, RenderEventType, RenderQuality, ThumbnailDragMode, ThumbnailLayout} from '../../classes/pdfjs-objects';
import {ThumbnailDragService} from '../../services/thumbnail-drag.service';
import {PdfjsThumbnailComponent} from '../pdfjs-thumbnail/pdfjs-thumbnail.component';

@Component({
  selector: 'pdfjs-thumbnails',
  templateUrl: './pdfjs-thumbnails.component.html',
  styleUrls: ['./pdfjs-thumbnails.component.css'],
})
export class PdfjsThumbnailsComponent implements OnInit, OnDestroy {

  ThumbnailDragMode = ThumbnailDragMode;
  @Output()
  render: EventEmitter<RenderEvent> = new EventEmitter();
  @ViewChild('container', {static: true, read: ViewContainerRef})
  container: ViewContainerRef;
  @ViewChild('pdfjs-preview', {static: true})
  previewRef: ElementRef;
  @HostBinding('class.vertical')
  vertical = false;
  itemEvent$: Subject<PdfjsItemEvent> = new Subject<PdfjsItemEvent>();
  thumbnailComponentRefs: Array<ComponentRef<PdfjsThumbnailComponent>> = [];
  itemToPreview: PdfjsItem & DOMRect;
  /**
   * Height of preview
   */
  @Input()
  previewHeight = 300;
  /**
   * quality of preview
   */
  @Input()
  previewQuality: RenderQuality = 2;

  private init = false;
  private items: PdfjsItem[] = [];
  private itemToRenderCount = 0;
  private subOnPdfjsGroupCtrl: Subscription;
  private subOnPdfjsCtrl: Subscription;
  private containerIsSelected = false;
  private innerQuality: RenderQuality = 1;
  private innerFitSize = 100;
  private innerPreviewDelay = 100;
  private innerDragMode = ThumbnailDragMode.DUPLICATE;
  private innerBorderWidth = 5;
  private innerAllowRemove = false;
  private innerAllowDrop = false;
  private innerPdfjsControl: PdfjsControl;
  private innerPdfjsGroupControl: PdfjsGroupControl;

  constructor(
    private cfr: ComponentFactoryResolver,
    private defaultInjector: Injector,
    private appRef: ApplicationRef,
    public elementRef: ElementRef,
    private thumbnailDragService: ThumbnailDragService,
  ) {
  }

  get quality(): RenderQuality {
    return this.innerQuality;
  }

  /**
   * The quality of pdf render
   */
  @Input()
  set quality(q: RenderQuality) {
    if (this.innerQuality !== q) {
      this.innerQuality = q;
      this.startLoading();
      this.thumbnailComponentRefs.forEach((componentRef: ComponentRef<PdfjsThumbnailComponent>) => {
        componentRef.instance.quality = q;
      });
    }
  }

  get fitSize(): number {
    return this.innerFitSize;
  }

  /**
   * size to fitSelected. Depends of direction layout
   */
  @Input()
  set fitSize(size: number) {
    if (this.innerFitSize !== size) {
      this.innerFitSize = size;
      this.computeSizes();
      this.startLoading();
      this.thumbnailComponentRefs.forEach((componentRef: ComponentRef<PdfjsThumbnailComponent>) => {
        componentRef.instance.fitSize = size;
      });
    }
  }

  get previewDelay(): number {
    return this.innerPreviewDelay;
  }

  /**
   * Delay for show preview. 0 => disable preview
   */
  @Input()
  set previewDelay(delay: number) {
    if (this.innerPreviewDelay !== delay) {
      this.innerPreviewDelay = delay;
      this.thumbnailComponentRefs.forEach((componentRef: ComponentRef<PdfjsThumbnailComponent>) => {
        componentRef.instance.previewEnabled = !!delay;
      });
    }
  }

  get dragMode(): ThumbnailDragMode {
    return this.innerDragMode;
  }

  /**
   * Drag mode
   */
  @Input()
  set dragMode(drag: ThumbnailDragMode) {
    if (this.innerDragMode !== drag) {
      this.innerDragMode = drag;
      this.thumbnailComponentRefs.forEach((componentRef: ComponentRef<PdfjsThumbnailComponent>) => {
        componentRef.instance.draggable = drag !== ThumbnailDragMode.NONE;
      });
    }
  }

  @Input()
  get borderWidth(): number {
    return this.innerBorderWidth;
  }

  set borderWidth(value: number) {
    if (this.innerBorderWidth !== value) {
      this.innerBorderWidth = value;
      this.startLoading();
      this.thumbnailComponentRefs.forEach((componentRef: ComponentRef<PdfjsThumbnailComponent>) => {
        componentRef.instance.borderWidth = value;
      });
    }
  }

  get allowRemove(): boolean {
    return this.innerAllowRemove;
  }

  /**
   * The remove button on thumbnail is it visible
   */
  @Input()
  set allowRemove(allow: boolean) {
    if (this.innerAllowRemove !== allow) {
      this.innerAllowRemove = allow;
      this.thumbnailComponentRefs.forEach((componentRef: ComponentRef<PdfjsThumbnailComponent>) => {
        componentRef.instance.removable = allow;
      });
    }
  }

  get allowDrop(): boolean {
    return this.innerAllowDrop;
  }

  /**
   * This container accept drop thumbnail
   */
  @Input()
  set allowDrop(allow: boolean) {
    if (this.innerAllowDrop !== allow) {
      this.innerAllowDrop = allow;
      this.thumbnailDragService.unregisterDropThumbnails(this);
      this.thumbnailDragService.registerDropThumbnails(this);
    }
  }

  get pdfjsControl(): PdfjsControl {
    return this.innerPdfjsControl;
  }

  /**
   * Define the pdfjsControl for this thumbnail container
   */
  @Input()
  set pdfjsControl(pdfjsControl: PdfjsControl) {
    this.unsubOnPdfjsCtrl();
    this.innerPdfjsControl = pdfjsControl;
    if (pdfjsControl) {
      this.subOnPdfjsCtrl = pdfjsControl.itemEvent$.pipe(
        filter((next: PdfjsItemEvent) => !!next),
      ).subscribe((next: PdfjsItemEvent) => {
        if (next.event === 'init') {
          this.ctrlItemEventInitHandler();
        } else if (next.event === 'endInit') {
          this.ctrlItemEventEndInitHandler();
        } else {
          this.ctrlItemEventOtherHandler(next);
        }
      });
    }
  }

  get pdfjsGroupControl(): PdfjsGroupControl {
    return this.innerPdfjsGroupControl;
  }

  /**
   * Define the pdfjsGroupControl for thumbnail containers
   */
  @Input()
  set pdfjsGroupControl(pdfjsGroupControl: PdfjsGroupControl) {
    this.unsubOnPdfjsGroupCtrl();
    this.innerPdfjsGroupControl = pdfjsGroupControl;
    if (!!pdfjsGroupControl) {
      this.subOnPdfjsGroupCtrl = pdfjsGroupControl.selectedPdfjsControl$.pipe(
        map((ctrl: PdfjsControl) => !!this.innerPdfjsControl && this.innerPdfjsControl.isEqual(ctrl)),
      ).subscribe((containerIsSelected: boolean) => {
        this.containerIsSelected = containerIsSelected;
        this.thumbnailComponentRefs.forEach((componentRef: ComponentRef<PdfjsThumbnailComponent>) => {
          componentRef.instance.containerIsSelected = containerIsSelected;
        });
      });
    }
  }

  get layout(): ThumbnailLayout {
    return this.vertical ? ThumbnailLayout.VERTICAL : ThumbnailLayout.HORIZONTAL;
  }

  /**
   * Layout direction
   */
  @Input()
  set layout(layout: ThumbnailLayout) {
    this.vertical = layout !== ThumbnailLayout.HORIZONTAL;
    this.startLoading();
    this.thumbnailComponentRefs.forEach((componentRef: ComponentRef<PdfjsThumbnailComponent>) => {
      componentRef.instance.layout = layout;
    });
    this.computeSizes();
  }

  /**
   * Start process of drag thumbnail
   */
  @HostListener('dragstart', ['$event'])
  onDragStart(event: DragEvent) {
    this.itemToPreview = null;
    if (this.innerDragMode !== ThumbnailDragMode.NONE) {
      this.startLoading();
      const thumbnail: HTMLElement = this.thumbnailDragService.getFirstParentThumbnail(event.target as HTMLElement);
      const thumbnails: HTMLElement = this.elementRef.nativeElement as HTMLElement;
      const idx: number = this.thumbnailDragService.getIndexOfThumbnailInThumbnails(thumbnail, thumbnails);
      if (!isNaN(idx)) {
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/html', '<div></div>');
        this.thumbnailDragService.initDataTransfer(this.pdfjsControl.getItemByIndex(idx), this.pdfjsControl, idx, this.innerDragMode);
      }
    }
  }

  ngOnInit() {
    this.thumbnailDragService.registerDropThumbnails(this);
    this.itemEvent$.subscribe((itemEvent: PdfjsItemEvent) => {
      if (itemEvent.event === PdfjsItemEventType.ADD) {
        this.addThumbnailComponentToDom(itemEvent.item, itemEvent.to);
      } else if (itemEvent.event === PdfjsItemEventType.REMOVE) {
        this.removeThumbnailComponentToDom(itemEvent.item);
      } else if (itemEvent.event === PdfjsItemEventType.UPDATE) {
        this.updateThumbnailComponentToDom(itemEvent.item);
      }
    });
    this.computeSizes();
  }

  ngOnDestroy() {
    this.unregisterDragService();
    this.unsubOnPdfjsGroupCtrl();
    this.unsubOnPdfjsCtrl();
  }

  /**
   * scrolling
   */
  @HostListener('scroll', [])
  onScroll() {
    this.itemToPreview = null;
  }

  @HostListener('mouseout', [])
  mouseOut() {
    this.itemToPreview = null;
  }

  private ctrlItemEventInitHandler() {
    this.items = [];
    this.container.clear();
    this.thumbnailComponentRefs = [];
    this.init = true;
  }

  private ctrlItemEventEndInitHandler() {
    this.startLoading();
    this.init = false;
    if (this.items.length) {
      this.itemEvent$.next({event: PdfjsItemEventType.ADD, item: this.items.shift(), to: 0});
    }
  }

  private ctrlItemEventOtherHandler(next: PdfjsItemEvent) {
    if (this.init && next.event === PdfjsItemEventType.ADD) {
      this.items.push(next.item);
    } else {
      this.itemEvent$.next(next);
    }
  }

  /**
   * compute sizes of thumbnail
   */
  private computeSizes() {
    const thumbnails: HTMLElement = this.elementRef.nativeElement as HTMLElement;
    if (!!thumbnails) {
      if (this.vertical) {
        thumbnails.style.height = null;
        thumbnails.style.width = `${this.innerFitSize}px`;
      } else {
        thumbnails.style.width = null;
        thumbnails.style.height = `${this.innerFitSize}px`;
      }
    }
  }

  private unsubOnPdfjsGroupCtrl() {
    if (!!this.subOnPdfjsGroupCtrl) {
      this.subOnPdfjsGroupCtrl.unsubscribe();
    }
  }

  private unsubOnPdfjsCtrl() {
    if (!!this.subOnPdfjsCtrl) {
      this.subOnPdfjsCtrl.unsubscribe();
    }
  }

  private unregisterDragService() {
    this.thumbnailDragService.unregisterDropThumbnails(this);
  }

  private removeThumbnail(item: PdfjsItem) {
    this.itemToPreview = null;
    this.pdfjsControl.removeItem(item);
  }

  private selection(item: PdfjsItem) {
    this.pdfjsControl.selectItemIndex(this.pdfjsControl.indexOfItem(item));
    if (this.pdfjsGroupControl) {
      this.pdfjsGroupControl.selectControl(this.pdfjsControl);
    }
  }

  private nextThumbnail($event: PdfjsItem) {
    if (!!this.items) {
      if (!!this.items.length) {
        this.progressLoading($event.pageIdx);
        this.itemEvent$.next({event: PdfjsItemEventType.ADD, item: this.items.shift()});
      } else if (!this.itemToRenderCount) {
        this.render.emit({
          type: RenderEventType.END,
          page: this.innerPdfjsControl.getPageNumber(),
          pages: this.innerPdfjsControl.getPageNumber(),
          time: new Date().getTime()
        });
      }
    }

  }

  /**
   * remove PdfjsThumbnailComponent from dom
   */
  private removeThumbnailComponentToDom(item: PdfjsItem) {
    const idx = this.thumbnailComponentRefs.findIndex((component: ComponentRef<PdfjsThumbnailComponent>) => PdfjsItem.areEqual(component.instance.item, item));
    if (idx !== -1) {
      // Remove component from both view and array
      this.container.remove(idx);
      this.thumbnailComponentRefs.splice(idx, 1);
    }
    return idx;
  }

  /**
   * add ThumbnailComponent to dom
   */
  private addThumbnailComponentToDom(item: PdfjsItem, index: number) {
    if (index === undefined || index === -1) {
      index = this.thumbnailComponentRefs.length;
    }
    const componentFactory = this.cfr.resolveComponentFactory(PdfjsThumbnailComponent);
    const componentRef: ComponentRef<PdfjsThumbnailComponent> = this.container.createComponent(componentFactory, index);
    this.thumbnailComponentRefs.splice(index, 0, componentRef);
    this.initThumbnailComponent(componentRef.instance, item);
  }

  private updateThumbnailComponentToDom(item: PdfjsItem) {
    const idx = this.thumbnailComponentRefs.findIndex((component: ComponentRef<PdfjsThumbnailComponent>) => PdfjsItem.areEqual(component.instance.item, item));
    if (idx !== -1) {
      this.container.remove(idx);
      const componentFactory = this.cfr.resolveComponentFactory(PdfjsThumbnailComponent);
      const componentRef: ComponentRef<PdfjsThumbnailComponent> = this.container.createComponent(componentFactory, idx);
      this.thumbnailComponentRefs.splice(idx, 1, componentRef);
      this.initThumbnailComponent(componentRef.instance, item);
    }
  }

  private initThumbnailComponent(instance: PdfjsThumbnailComponent, item: PdfjsItem) {
    instance.quality = this.innerQuality;
    instance.removable = this.innerAllowRemove;
    instance.fitSize = this.innerFitSize;
    instance.draggable = this.innerDragMode !== ThumbnailDragMode.NONE;
    instance.layout = this.layout;
    instance.previewEnabled = !!this.innerPreviewDelay;
    instance.containerIsSelected = this.containerIsSelected;

    instance.showPreview.subscribe(($event: PdfjsItem & DOMRect) => {
      if (!this.thumbnailDragService.dataTransferInitiated()) {
        this.itemToPreview = $event;
      }
    });
    instance.endRender.subscribe(($event: PdfjsItem) => {
      this.itemToRenderCount--;
      this.nextThumbnail($event);
    });
    instance.startRender.subscribe(() => {
      this.itemToRenderCount++;
    });
    instance.selectItem.subscribe(($event: PdfjsItem) => {
      this.selection($event);
    });
    instance.removeButtonClick.subscribe(($event: PdfjsItem) => {
      this.removeThumbnail($event);
    });
    instance.pdfjsControl = this.innerPdfjsControl;
    instance.item = item;
  }

  private progressLoading(pageNumber: number) {
    if (this.innerPdfjsControl) {
      this.render.emit({
        type: RenderEventType.PROGRESS,
        page: pageNumber,
        pages: this.innerPdfjsControl.getPageNumber(),
        time: new Date().getTime()
      });
    }
  }

  private startLoading() {
    if (this.innerPdfjsControl) {
      this.itemToRenderCount = 0;
      this.render.emit({
        type: RenderEventType.START,
        page: 0,
        pages: this.innerPdfjsControl.getPageNumber(),
        time: new Date().getTime()
      });
    }
  }
}
