import {PDFPageProxy, PDFPageViewport, PDFPromise} from 'pdfjs-dist';
import {PDFDataRangeTransport} from './pdfapi';
import {PdfjsItem} from './pdfjs-item';
import {InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';

export const PDF_API = new InjectionToken<Observable<string>>('PdfApi');

export class PdfjsItemEvent {
  item: PdfjsItem;
  event: PdfjsItemEventType;
  from?: number;
  to?: number;
}
export enum PdfjsItemEventType {
  INIT = 'init',
  UPDATE = 'update',
  ADD = 'add',
  REMOVE = 'remove',
  END_INIT = 'endInit'
}

export class PdfjsItemAddEvent extends PdfjsItemEvent {
  public event: PdfjsItemEventType.ADD;
  constructor(data: {item: PdfjsItem, to: number}) {
    super();
    this.item = data.item;
    this.to = data.to;
  }
}

export class PdfjsItemRemoveEvent extends PdfjsItemEvent {
  public event: PdfjsItemEventType.REMOVE;
  constructor(data: {item: PdfjsItem}) {
    super();
    this.item = data.item;
  }
}

export interface CanvasWrapperRenderEvent {
  viewport: PDFPageViewport;
  pdfPageProxy: PDFPageProxy;
  width: number;
  height: number;
}

export interface PreviewEvent {
  item: PdfjsItem;
  atTop: boolean;
  atLeft: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
}

export class RenderEvent {
  public type: RenderEventType;
  public page = 0;
  public pages = 0;
  public time = 0;
}

export enum RenderEventType {
  START = 'START',
  PROGRESS = 'PROGRESS',
  END = 'END'
}

export interface PdfPage {
  pdfId: string;
  document: PdfSource;
  pageIdx: number;
  rotation: number;
}


export enum ThumbnailLayout {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

export enum ViewFit {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

export enum ThumbnailDragMode {
  NONE = 'none',
  MOVE = 'move',
  DUPLICATE = 'duplicate',
}

export type ThumbnailOver = ThumbnailOverValues.RIGHT | ThumbnailOverValues.LEFT | ThumbnailOverValues.BOTTOM | ThumbnailOverValues.TOP;

export enum ThumbnailOverValues {
  RIGHT = 'right',
  LEFT = 'left',
  BOTTOM = 'bottom',
  TOP = 'top'
}

export type RenderQuality = 1 | 2 | 3 | 4 | 5;

export type PdfSource = string | PDFDataRangeTransport | Uint8Array |
  { data: Uint8Array } | { range: PDFDataRangeTransport } | { url: string, cMapUrl?: string, cMapPacked?: boolean};

export class PdfjsConfig {
  workerSrc: string;
  cMapUrl?: string;
  cMapPacked?: boolean;
}

export class PDFPromiseResolved<T> implements PDFPromise<T> {
  public constructor(private res: T) {
  }

  public isResolved: () => true;

  public isRejected: () => false;

  public resolve: (value: T) => void;

  public reject: (reason: string) => void;

  public then<U>(onResolve: (promise: T) => U, onReject?: (reason: string) => void): PDFPromiseResolved<U> {
    return new PDFPromiseResolved(onResolve(this.res));
  }
}
