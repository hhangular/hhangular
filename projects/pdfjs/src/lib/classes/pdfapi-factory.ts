import {PdfApi} from './pdfapi';
import * as api from 'pdfjs-dist/build/pdf';

export function pdfApiFactory() {
  return api as PdfApi;
}
