import {PDFDocumentProxy, PDFPromise} from 'pdfjs-dist';
import {BehaviorSubject} from 'rxjs';
import {filter} from 'rxjs/operators';
import {PdfApi} from '../classes/pdfapi';
import {PdfjsCommand} from './pdfjs-command';
import {PdfjsItemAddEvent, PdfjsItemEvent, PdfjsItemEventType, PdfjsItemRemoveEvent, PdfPage, PDFPromiseResolved, PdfSource} from '../classes/pdfjs-objects';
import {PdfjsItem} from '../classes/pdfjs-item';
import {Crypto} from '../classes/pdfjs-crypto';
import {pdfApiFactory} from '../classes/pdfapi-factory';

export class PdfjsControl implements PdfjsCommand {
  public id: string;
  public pdfId: string;
  public itemEvent$: BehaviorSubject<PdfjsItemEvent> = new BehaviorSubject(null);
  public selectedItem$: BehaviorSubject<PdfjsItem> = new BehaviorSubject<PdfjsItem>(null);
  public selectedIndex$: BehaviorSubject<number> = new BehaviorSubject<number>(NaN);
  private API: PdfApi = pdfApiFactory();
  private source: PdfSource;
  private items: PdfjsItem[] = [];
  private autoSelect = false;
  private itemIndex = NaN; // item selected index
  private addItemEvent: BehaviorSubject<PdfjsItemAddEvent> = new BehaviorSubject<PdfjsItemAddEvent>(null);
  private removeItemEvent: BehaviorSubject<PdfjsItemRemoveEvent> = new BehaviorSubject<PdfjsItemRemoveEvent>(null);

  constructor() {
    this.id = Crypto.uuid();
    this.subscribeToAddItem();
    this.subscribeToRemoveItem();
  }

  public getPdfPages(): PdfPage[] {
    return this.items.map(val => {
      return {document: val.document, pdfId: val.pdfId, pageIdx: val.pageIdx, rotation: val.rotation};
    });
  }

  public getItemByIndex(idx: number): PdfjsItem {
    return this.items[idx];
  }

  public getPageNumber(): number {
    return this.items.length;
  }

  public containsItem(item: PdfjsItem): boolean {
    return this.items.some((it: PdfjsItem) => {
      return it.pdfId === item.pdfId && it.pageIdx === item.pageIdx;
    });
  }

  public indexOfItem(item: PdfjsItem): number {
    return !!item ? this.indexOfItemByIds(item.pdfId, item.pageIdx) : -1;
  }

  public addItem(item: PdfjsItem, idx?: number): void {
    this.addItemEvent.next({item, event: PdfjsItemEventType.ADD, to: idx});
  }

  public removeItem(item: PdfjsItem): void {
    this.removeItemEvent.next({item, event: PdfjsItemEventType.REMOVE});
  }

  public load(source: PdfSource, autoSelect = false): PDFPromise<number> {
    this.pdfId = getPdfId(source);
    this.source = source;
    this.autoSelect = autoSelect;
    this.selectedItem$.next(null);
    this.selectedIndex$.next(NaN);
    this.itemIndex = NaN;
    this.emptyItems();
    return this.processDocument(source).then((numPages: number) => {
      return numPages;
    });
  }

  public unload(): void {
    this.source = null;
    this.itemIndex = NaN;
    this.items = [];
  }

  public unselect(): number {
    return this.selectItemIndex(NaN);
  }

  public selectPageIndex(index: number): number {
    return this.selectItemIndex(index - 1);
  }

  public selectItemIndex(index: number): number {
    const prev: number = this.itemIndex;
    if (isNaN(index)) {
      this.selectedItem$.next(null);
      this.selectedIndex$.next(NaN);
      this.itemIndex = NaN;
    } else if (this.isValidList() && index >= 0 && index < this.items.length) {
      this.itemIndex = index;
      const item: PdfjsItem = new PdfjsItem({...this.items[this.itemIndex]});
      this.selectedItem$.next(item);
      this.selectedIndex$.next(index);
    }
    return prev;
  }

  public selectFirst(): number {
    if (this.isValidList()) {
      return this.selectItemIndex(0);
    }
    return NaN;
  }

  public selectLast(): number {
    if (this.isValidList()) {
      return this.selectItemIndex(this.items.length - 1);
    }
    return NaN;
  }

  public nextIsSelectable(): boolean {
    return this.isValidList() && this.isValidIndex() && this.itemIndex + 1 < this.items.length;
  }

  public previousIsSelectable(): boolean {
    return this.isValidList() && this.isValidIndex() && this.itemIndex > 0;
  }

  public selectNext(): number {
    if (this.nextIsSelectable()) {
      return this.selectItemIndex(this.itemIndex + 1);
    }
    return NaN;
  }

  public selectPrevious(): number {
    if (this.previousIsSelectable()) {
      return this.selectItemIndex(isNaN(this.itemIndex) ? NaN : this.itemIndex - 1);
    }
    return NaN;
  }

  public rotate(angle: number): void {
    this.itemEvent$.next({item: null, event: PdfjsItemEventType.INIT});
    this.items = this.items.map((item: PdfjsItem, i: number) => {
      const clone = new PdfjsItem({...item, rotation: item.rotation + angle});
      this.itemEvent$.next({item: clone, event: PdfjsItemEventType.ADD, to: i});
      return clone;
    });
    this.itemEvent$.next({item: null, event: PdfjsItemEventType.END_INIT});
    this.selectItemIndex(this.itemIndex);
  }

  public rotateSelected(angle: number): void {
    if (!!this.items.length) {
      const old: PdfjsItem = this.items[this.itemIndex];
      const item: PdfjsItem = new PdfjsItem({...old, rotation: old.rotation + angle});
      this.items.splice(this.itemIndex, 1, item);
      this.itemEvent$.next({item, event: PdfjsItemEventType.UPDATE});
      this.selectedItem$.next(item);
    }
  }

  public reload(): PDFPromise<number> {
    const idx = this.selectItemIndex(NaN);
    if (!!this.pdfId) {
      return this.load(this.source).then((num: number) => {
        this.selectItemIndex(idx);
        return num;
      });
    }
    return new PDFPromiseResolved<number>(0);
  }

  /**
   * index based 0
   */
  public getSelectedItemIndex(): number {
    return this.itemIndex;
  }

  /**
   * index based 1
   */
  public getSelectedPageIndex(): number {
    return isNaN(this.itemIndex) ? this.itemIndex : this.itemIndex + 1;
  }

  public isEqual(other: PdfjsControl) {
    if (!other) {
      return false;
    }
    return this.id === other.id;
  }

  private subscribeToAddItem() {
    this.addItemEvent.pipe(
      filter(itemEvent => !!itemEvent),
    ).subscribe(itemEvent => this.processAddItemEvent(itemEvent));
  }

  private processAddItemEvent(itemEvent: PdfjsItemAddEvent) {
    let idx = itemEvent.to;
    const clone: PdfjsItem = new PdfjsItem({...itemEvent.item});
    let pos: number = this.indexOfItem(clone);
    if (idx === undefined) {
      if (pos !== -1 && pos !== this.items.length - 1) {
        this.items.splice(pos, 1);
        this.itemEvent$.next({item: clone, event: PdfjsItemEventType.REMOVE});
        pos = -1;
      }
      if (pos === -1) {
        this.items.push(clone);
        this.itemEvent$.next({item: clone, event: PdfjsItemEventType.ADD});
      }
    } else {
      if (pos !== -1) {
        this.items.splice(pos, 1);
        this.itemEvent$.next({item: clone, event: PdfjsItemEventType.REMOVE});
        if (pos < idx) {
          idx--;
        }
      }
      this.items.splice(idx, 0, clone);
      this.itemEvent$.next({item: clone, event: PdfjsItemEventType.ADD, to: idx});
      // in case where item add was before current selected index
      this.fixAfterAddItem();
    }
  }

  private subscribeToRemoveItem() {
    this.removeItemEvent.pipe(
      filter(itemEvent => !!itemEvent),
    ).subscribe(itemEvent => this.processRemoveItemEvent(itemEvent));
  }

  private processRemoveItemEvent(itemEvent: PdfjsItemRemoveEvent) {
    const item: PdfjsItem = itemEvent.item;
    const isSelected = this.isSelected(item);
    const idx: number = this.indexOfItem(item);
    let removed: PdfjsItem = null;
    if (idx !== -1) {
      removed = this.items.splice(idx, 1)[0];
      if (removed.pdfId !== item.pdfId || removed.pageIdx !== item.pageIdx) {
        this.items.splice(idx, 0, removed);
        removed = null;
      }
      this.itemEvent$.next({item, event: PdfjsItemEventType.REMOVE});
      // in case where item removed was before current selected index or it was removed item
      this.fixAfterRemoveItem(isSelected);
    }
  }

  private indexOfItemByIds(pdfId: string, pageIdx: number): number {
    return this.items.findIndex((it: PdfjsItem) => it.pdfId === pdfId && it.pageIdx === pageIdx);
  }

  private isSelected(item: PdfjsItem): boolean {
    return item && !isNaN(this.itemIndex) && this.items[this.itemIndex] && item.pdfId === this.items[this.itemIndex].pdfId && item.pageIdx === this.items[this.itemIndex].pageIdx;
  }

  private fixAfterAddItem() {
    this.itemIndex = this.indexOfItem(this.selectedItem$.getValue());
    this.selectedIndex$.next(this.itemIndex);
  }

  private fixAfterRemoveItem(wasSelected: boolean) {
    if (wasSelected) {
      this.itemIndex = NaN;
      this.selectedIndex$.next(NaN);
      this.selectedItem$.next(null);
    } else {
      this.itemIndex = this.indexOfItem(this.selectedItem$.getValue());
      this.selectedIndex$.next(this.itemIndex);
    }
  }

  private isValidList() {
    return !!this.items;
  }

  /*
    private unsubscribeRotateSubject() {
      if (this.rotationSubscription) {
        this.rotationSubscription.unsubscribe();
        this.rotationSubscription = null;
      }
    }
  */

  private isValidIndex() {
    return !isNaN(this.itemIndex);
  }

  /**
   * build items
   */
  private processDocument(source: PdfSource): PDFPromise<number> {
    let src: any = source;
    if (typeof source === 'string') {
      src = {url: source, ...this.API.GlobalCMapOptions};
    }
    this.itemEvent$.next({item: null, event: PdfjsItemEventType.INIT});
    return this.API.getDocument(src).promise.then((pdfDocumentProxy: PDFDocumentProxy) => {
      this.buildPdfjsItems(source, pdfDocumentProxy);
      this.itemEvent$.next({item: null, event: PdfjsItemEventType.END_INIT});
      if (this.autoSelect) {
        this.selectFirst();
      }
      return pdfDocumentProxy.numPages;
    }, (reason: string) => {
    });
  }

  private buildPdfjsItems(source: PdfSource, pdfDocumentProxy: PDFDocumentProxy): void {
    [].push.apply(this.items, Array.apply(null, {length: pdfDocumentProxy.numPages})
      .map((e: any, i: number) => {
        const item: PdfjsItem = new PdfjsItem({documentProxy: pdfDocumentProxy, pdfId: this.pdfId, document: source, pageIdx: i + 1, rotation: 0});
        this.itemEvent$.next({item, event: PdfjsItemEventType.ADD, to: i});
        return item;
      }, this));
  }

  private emptyItems() {
    if (this.items && this.items.length) {
      this.items
        .map(item => ({item, event: PdfjsItemEventType.REMOVE} as PdfjsItemEvent))
        .forEach(event => this.itemEvent$.next(event));
    }
    this.items = [];
  }
}

function getPdfId(source: PdfSource): string {
  if (typeof source === 'string') {
    return Crypto.md5(source as string);
  } else if (!!(source as any).id) {
    return (source as any).id;
  } else if (!!(source as any).url) {
    return Crypto.md5((source as any).url);
  } else {
    return Crypto.uuid();
  }
}
