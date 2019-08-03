import {PDFDocumentProxy, PDFLoadingTask, PDFProgressData, TextContent} from 'pdfjs-dist';

export interface PdfApi {
  apiCompatibilityParams: any;
  build: string;
  version: string;

  AnnotationLayer: AnnotationLayer;
  GlobalWorkerOptions: GlobalWorkerOptions;
  GlobalCMapOptions: GlobalCMapOptions;
  InvalidPDFException: InvalidPDFException;
  LinkTarget: LinkTarget;
  LoopbackPort: LoopbackPort;
  MissingPDFException: MissingPDFException;
  NativeImageDecoding: NativeImageDecoding;
  OPS: OPS;
  PDFDataRangeTransport: PDFDataRangeTransport;
  PDFWorker: PDFWorker;
  PasswordResponses: PasswordResponses;
  RenderingCancelledException: RenderingCancelledException;
  SVGGraphics: SVGGraphics;
  UNSUPPORTED_FEATURES: any;
  UnexpectedResponseException: UnexpectedResponseException;
  Util: Util;
  VerbosityLevel: VerbosityLevel;

  addLinkAttributes();

  createBlob(data: any, contentType: any): any;

  createObjectURL(data: any, contentType: any);

  createPromiseCapability(): any;

  createValidAbsoluteUrl(url: string, baseUrl: string): string;

  getDocument(src: string | PDFDataRangeTransport | Uint8Array |
                { data: Uint8Array } | { range: PDFDataRangeTransport } | { url: string },
              pdfDataRangeTransport?: any,
              passwordCallback?: (fn: (password: string) => void, reason: string) => string,
              progressCallback?: (progressData: PDFProgressData) => void
  ): PDFLoadingTask<PDFDocumentProxy>;

  getFilenameFromUrl(url): string;

  removeNullCharacters(str: string);

  renderTextLayer(renderParameters: RenderParameters): TextLayerRenderTask;

  shadow(obj: any, prop: any, value: any): any;
}

export interface TextLayerRenderTask extends PDFLoadingTask<TextContent> {
  cancel();
}

export interface RenderParameters {
  textContent?: any;
  textContentStream?: any;
  container?: any;
  viewport?: any;
  textDivs?: any;
  textContentItemsStr?: any;
  enhanceTextSelection?: any;
  timeout?: any;
}

export declare class AnnotationLayer {
  static render(parameters: {
    annotations: any[], div: HTMLDivElement,
    page: any, viewport: any, linkService: any, downloadManager: any, imageResourcesPath: string,
    renderInteractiveForms: boolean,
  }): void;

  static update(parameters: { annotations: any[], div: HTMLDivElement, viewport: any }): void;
}
export interface GlobalCMapOptions {
  cMapUrl: string;
  cMapPacked: boolean;
}
export interface GlobalWorkerOptions {
  workerPort: string;
  workerSrc: string;
}

export interface InvalidPDFException {
  name: string;
  message: string;
}

export declare class LinkTarget {
  static NONE: number;
  static SELF: number;
  static BLANK: number;
  static PARENT: number;
  static TOP: number;
}

export interface LoopbackPort {

  addEventListener(name: string, listener: any);

  postMessage(obj: any, transfers: any): any;

  removeEventListener(name: any, listener: any): any;

  terminate(): any;
}

export interface MissingPDFException {
  name: string;
  message: string;
}

export declare class NativeImageDecoding {
  static NONE: string;
  static DECODE: string;
  static DISPLAY: string;
}

export declare class OPS {
  static beginAnnotation: number;
  static beginAnnotations: number;
  static beginCompat: number;
  static beginGroup: number;
  static beginImageData: number;
  static beginInlineImage: number;
  static beginMarkedContent: number;
  static beginMarkedContentProps: number;
  static beginText: number;
  static clip: number;
  static closeEOFillStroke: number;
  static closeFillStroke: number;
  static closePath: number;
  static closeStroke: number;
  static constructPath: number;
  static curveTo: number;
  static curveTo2: number;
  static curveTo3: number;
  static dependency: number;
  static endAnnotation: number;
  static endAnnotations: number;
  static endCompat: number;
  static endGroup: number;
  static endInlineImage: number;
  static endMarkedContent: number;
  static endPath: number;
  static endText: number;
  static eoClip: number;
  static eoFill: number;
  static eoFillStroke: number;
  static fill: number;
  static fillStroke: number;
  static lineTo: number;
  static markPoint: number;
  static markPointProps: number;
  static moveText: number;
  static moveTo: number;
  static nextLine: number;
  static nextLineSetSpacingShowText: number;
  static nextLineShowText: number;
  static paintFormXObjectBegin: number;
  static paintFormXObjectEnd: number;
  static paintImageMaskXObject: number;
  static paintImageMaskXObjectGroup: number;
  static paintImageMaskXObjectRepeat: number;
  static paintImageXObject: number;
  static paintImageXObjectRepeat: number;
  static paintInlineImageXObject: number;
  static paintInlineImageXObjectGroup: number;
  static paintJpegXObject: number;
  static paintSolidColorImageMask: number;
  static paintXObject: number;
  static rectangle: number;
  static restore: number;
  static save: number;
  static setCharSpacing: number;
  static setCharWidth: number;
  static setCharWidthAndBounds: number;
  static setDash: number;
  static setFillCMYKColor: number;
  static setFillColor: number;
  static setFillColorN: number;
  static setFillColorSpace: number;
  static setFillGray: number;
  static setFillRGBColor: number;
  static setFlatness: number;
  static setFont: number;
  static setGState: number;
  static setHScale: number;
  static setLeading: number;
  static setLeadingMoveText: number;
  static setLineCap: number;
  static setLineJoin: number;
  static setLineWidth: number;
  static setMiterLimit: number;
  static setRenderingIntent: number;
  static setStrokeCMYKColor: number;
  static setStrokeColor: number;
  static setStrokeColorN: number;
  static setStrokeColorSpace: number;
  static setStrokeGray: number;
  static setStrokeRGBColor: number;
  static setTextMatrix: number;
  static setTextRenderingMode: number;
  static setTextRise: number;
  static setWordSpacing: number;
  static shadingFill: number;
  static showSpacedText: number;
  static showText: number;
  static stroke: number;
  static transform: number;
}

export declare class PDFDataRangeTransport {
  constructor(length: number, initialData: any);

  abort();

  addProgressListener(listener: any);

  addProgressiveReadListener(listener: any);

  addRangeListener(listener: any);

  onDataProgress(loaded: any);

  onDataProgressiveRead(chunk: any);

  onDataRange(begin: number, chunk: any);

  requestDataRange(begin: number, end: number);

  transportReady();
}

export declare class PDFWorker {
  messageHandler: any;

  port: any;

  promise: any;

  static fromPort(params);

  static getWorkerSrc();

  destroy();

  _initializeFromPort(port);

  _setupFakeWorker();

}

export declare class PasswordResponses {
  static NEED_PASSWORD: number;
  static INCORRECT_PASSWORD: number;
}

export declare class RenderingCancelledException {
  constructor(msg, type);
}

export declare class SVGGraphics {
  constructor(commonObjs: any, objs: any, forceDataSchema: any);

  addFontStyle(fontObj: any);

  beginText();

  clip(type: any);

  closeEOFillStroke();

  closeFillStroke();

  closePath();

  closeStroke();

  constructPath(ops: any, args: any);

  convertOpList(operatorList: any);

  endPath();

  endText();

  eoFill();

  eoFillStroke();

  executeOpTree(opTree: any);

  fill();

  fillStroke();

  getSVG(operatorList: any, viewport: any);

  group(items: any);

  loadDependencies(operatorList: any);

  moveText(x: any, y: any);

  nextLine();

  paintFormXObjectBegin(matrix: any, bbox: any);

  paintFormXObjectEnd();

  paintImageMaskXObject(imgData: any);

  paintImageXObject(objId: any);

  paintInlineImageXObject(imgData: any, mask: any);

  paintJpegXObject(objId: any, w: any, h: any);

  paintSolidColorImageMask();

  restore();

  save();

  setCharSpacing(charSpacing: any);

  setDash(dashArray: any, dashPhase: any);

  setFillAlpha(fillAlpha: any);

  setFillRGBColor(r: number, g: number, b: number);

  setFont(details: any);

  setGState(states: any);

  setHScale(scale: any);

  setLeading(leading: any);

  setLeadingMoveText(x: number, y: number);

  setLineCap(style: any);

  setLineJoin(style: any);

  setLineWidth(width: number);

  setMiterLimit(limit: any);

  setStrokeAlpha(strokeAlpha: number);

  setStrokeRGBColor(r: number, g: number, b: number);

  setTextMatrix(a: any, b: any, c: any, d: any, e: any, f: any);

  setTextRise(textRise: any);

  setWordSpacing(wordSpacing: any);

  showText(glyphs: any);

  stroke();

  transform(a: any, b: any, c: any, d: any, e: any, f: any);

  _ensureClipGroup();

  _ensureTransformGroup();
}

export declare class UnexpectedResponseException {
  constructor(msg: string, status: any);
}

export interface Util {
  appendToArray(arr1: any, arr2: any);

  apply3dTransform(m: any, v: any);

  applyInverseTransform(p: any, m: any);

  applyTransform(p: any, m: any);

  extendObj(obj1: any, obj2: any);

  getAxialAlignedBoundingBox(r: any, m: any);

  inherit(sub: any, base: any, prototype: any);

  intersect(rect1: any, rect2: any);

  inverseTransform(m: any);

  loadScript(src: any, callback: any);

  makeCssRgb(r: any, g: any, b: any);

  normalizeRect(rect: any);

  prependToArray(arr1: any, arr2: any);

  singularValueDecompose2dScale(m: any);

  toRoman(num: any, lowerCase: any);

  transform(m1: any, m2: any);
}

export declare class VerbosityLevel {
  static ERRORS: number;
  static WARNINGS: number;
  static INFOS: number;
}
