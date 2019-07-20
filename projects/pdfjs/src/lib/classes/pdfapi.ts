import {PDFDocumentProxy, PDFLoadingTask, PDFProgressData, PDFPromise, TextContent} from 'pdfjs-dist';

export declare class PdfApi {
  apiCompatibilityParams: any;
  build: string;
  version: string;

  AnnotationLayer: AnnotationLayer;
  GlobalWorkerOptions: GlobalWorkerOptions;
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

export declare class TextLayerRenderTask implements PDFLoadingTask<TextContent> {
  promise: PDFPromise<TextContent>;
  cancel();
}

export declare class RenderParameters {
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
  public static render(parameters: {
    annotations: any[], div: HTMLDivElement,
    page: any, viewport: any, linkService: any, downloadManager: any, imageResourcesPath: string,
    renderInteractiveForms: boolean,
  }): void;

  public static update(parameters: { annotations: any[], div: HTMLDivElement, viewport: any }): void;
}

export declare class GlobalWorkerOptions {
  workerPort: string;
  workerSrc: string;
}

export declare class InvalidPDFException {
}

export declare class LinkTarget {
  static NONE: number;
  static SELF: number;
  static BLANK: number;
  static PARENT: number;
  static TOP: number;
}

export declare class LoopbackPort {

  constructor(defer: any);

  public addEventListener(name: string, listener: any);

  public postMessage(obj: any, transfers: any): any;

  public removeEventListener(name: any, listener: any): any;

  public terminate(): any;
}

export declare class MissingPDFException {
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

  public abort();

  public addProgressListener(listener: any);

  public addProgressiveReadListener(listener: any);

  public addRangeListener(listener: any);

  public onDataProgress(loaded: any);

  public onDataProgressiveRead(chunk: any);

  public onDataRange(begin: number, chunk: any);

  public requestDataRange(begin: number, end: number);

  public transportReady();
}

declare class PDFWorker {
  public messageHandler: any;

  public port: any;

  public promise: any;

  public static fromPort(params);

  public static getWorkerSrc();

  public destroy();

  public _initializeFromPort(port);

  public _setupFakeWorker();

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

  public addFontStyle(fontObj: any);

  public beginText();

  public clip(type: any);

  public closeEOFillStroke();

  public closeFillStroke();

  public closePath();

  public closeStroke();

  public constructPath(ops: any, args: any);

  public convertOpList(operatorList: any);

  public endPath();

  public endText();

  public eoFill();

  public eoFillStroke();

  public executeOpTree(opTree: any);

  public fill();

  public fillStroke();

  public getSVG(operatorList: any, viewport: any);

  public group(items: any);

  public loadDependencies(operatorList: any);

  public moveText(x: any, y: any);

  public nextLine();

  public paintFormXObjectBegin(matrix: any, bbox: any);

  public paintFormXObjectEnd();

  public paintImageMaskXObject(imgData: any);

  public paintImageXObject(objId: any);

  public paintInlineImageXObject(imgData: any, mask: any);

  public paintJpegXObject(objId: any, w: any, h: any);

  public paintSolidColorImageMask();

  public restore();

  public save();

  public setCharSpacing(charSpacing: any);

  public setDash(dashArray: any, dashPhase: any);

  public setFillAlpha(fillAlpha: any);

  public setFillRGBColor(r: number, g: number, b: number);

  public setFont(details: any);

  public setGState(states: any);

  public setHScale(scale: any);

  public setLeading(leading: any);

  public setLeadingMoveText(x: number, y: number);

  public setLineCap(style: any);

  public setLineJoin(style: any);

  public setLineWidth(width: number);

  public setMiterLimit(limit: any);

  public setStrokeAlpha(strokeAlpha: number);

  public setStrokeRGBColor(r: number, g: number, b: number);

  public setTextMatrix(a: any, b: any, c: any, d: any, e: any, f: any);

  public setTextRise(textRise: any);

  public setWordSpacing(wordSpacing: any);

  public showText(glyphs: any);

  public stroke();

  public transform(a: any, b: any, c: any, d: any, e: any, f: any);

  public _ensureClipGroup();

  public _ensureTransformGroup();
}

export declare class UnexpectedResponseException {
  constructor(msg: string, status: any);
}

export declare class Util {
  public appendToArray(arr1: any, arr2: any);

  public apply3dTransform(m: any, v: any);

  public applyInverseTransform(p: any, m: any);

  public applyTransform(p: any, m: any);

  public extendObj(obj1: any, obj2: any);

  public getAxialAlignedBoundingBox(r: any, m: any);

  public inherit(sub: any, base: any, prototype: any);

  public intersect(rect1: any, rect2: any);

  public inverseTransform(m: any);

  public loadScript(src: any, callback: any);

  public makeCssRgb(r: any, g: any, b: any);

  public normalizeRect(rect: any);

  public prependToArray(arr1: any, arr2: any);

  public singularValueDecompose2dScale(m: any);

  public toRoman(num: any, lowerCase: any);

  public transform(m1: any, m2: any);
}

export declare class VerbosityLevel {
  static ERRORS: number;
  static WARNINGS: number;
  static INFOS: number;
}
