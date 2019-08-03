import {PDFDocumentProxy, PDFPageProxy, PDFPromise} from 'pdfjs-dist';
import {PdfSource} from './pdfjs-objects';

export class PdfjsItem {
  readonly documentProxy: PDFDocumentProxy;
  readonly pdfId: string;
  readonly document: PdfSource;
  readonly pageIdx: number;
  readonly rotation: number;

  constructor(item: { pdfId: string, document: PdfSource, pageIdx: number, rotation: number, documentProxy: PDFDocumentProxy }) {
    this.pageIdx = item.pageIdx;
    this.document = item.document;
    this.documentProxy = item.documentProxy;
    this.pdfId = item.pdfId;
    this.rotation = item.rotation;
  }

  static areEqual(x: PdfjsItem, y: PdfjsItem) {
    if (!x && !y) {
      return true;
    }
    if (!!x) {
      return x.equals(y);
    }
    return y.equals(x);
  }

  getPage(): PDFPromise<PDFPageProxy> {
    return this.documentProxy.getPage(this.pageIdx);
  }

  equals(other: PdfjsItem) {
    if (!other) {
      return false;
    }
    return this.pdfId === other.pdfId && this.pageIdx === other.pageIdx;
  }


}
