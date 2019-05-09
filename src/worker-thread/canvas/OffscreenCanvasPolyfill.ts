import { TransferrableMutationType } from '../../transfer/TransferrableMutation';
import { TransferrableKeys } from '../../transfer/TransferrableKeys';
import {
  CanvasRenderingContext2D,
  ImageSmoothingQuality,
  CanvasTextAlign,
  CanvasTextBaseline,
  CanvasLineCap,
  CanvasLineJoin,
  CanvasDirection,
  CanvasFillRule,
} from './CanvasTypes';
import { transfer } from '../MutationTransfer';
import { Document } from '../dom/Document';
import { NumericBoolean } from '../../utils';
import { store } from '../strings';
import { HTMLElement } from '../dom/HTMLElement';
import { serialize } from '../global-id';

export class OffscreenCanvasPolyfill<ElementType extends HTMLElement> {
  canvas: ElementType;
  context: OffscreenCanvasRenderingContext2DPolyfill<ElementType>;

  constructor(canvas: ElementType) {
    this.canvas = canvas;
  }

  getContext(contextType: string): CanvasRenderingContext2D {
    if (!this.context) {
      if (contextType === '2D' || contextType === '2d') {
        this.context = new OffscreenCanvasRenderingContext2DPolyfill<ElementType>(this.canvas);
      } else {
        throw new Error('Context type not supported.');
      }
    }
    return this.context;
  }
}

class OffscreenCanvasRenderingContext2DPolyfill<ElementType extends HTMLElement> implements CanvasRenderingContext2D {
  private canvasElement: ElementType;
  private lineDash: number[];

  constructor(canvas: ElementType) {
    this.canvasElement = canvas;
    this.lineDash = [];
  }

  private postToMainThread(fnName: string, isSetter: NumericBoolean, args: unknown[]) {
    transfer(this.canvasElement.ownerDocument as Document, [
      TransferrableMutationType.OFFSCREEN_POLYFILL,
      this.canvasElement[TransferrableKeys.index],
      args.length,
      store(fnName),
      isSetter,
      ...serialize(args),
    ]);
  }

  get canvas(): ElementType {
    return this.canvasElement;
  }

  clearRect(x: number, y: number, w: number, h: number): void {
    this.postToMainThread('clearRect', NumericBoolean.FALSE, [...arguments]);
  }

  fillRect(x: number, y: number, w: number, h: number): void {
    this.postToMainThread('fillRect', NumericBoolean.FALSE, [...arguments]);
  }

  strokeRect(x: number, y: number, w: number, h: number): void {
    this.postToMainThread('strokeRect', NumericBoolean.FALSE, [...arguments]);
  }

  set lineWidth(value: number) {
    this.postToMainThread('lineWidth', NumericBoolean.TRUE, [...arguments]);
  }

  fillText(text: string, x: number, y: number, maxWidth?: number) {
    this.postToMainThread('fillText', NumericBoolean.FALSE, [...arguments]);
  }

  moveTo(x: number, y: number) {
    this.postToMainThread('moveTo', NumericBoolean.FALSE, [...arguments]);
  }

  lineTo(x: number, y: number) {
    this.postToMainThread('lineTo', NumericBoolean.FALSE, [...arguments]);
  }

  closePath() {
    this.postToMainThread('closePath', NumericBoolean.FALSE, []);
  }

  stroke() {
    this.postToMainThread('stroke', NumericBoolean.FALSE, []);
  }

  restore() {
    this.postToMainThread('restore', NumericBoolean.FALSE, []);
  }

  save() {
    this.postToMainThread('save', NumericBoolean.FALSE, []);
  }

  resetTransform() {
    this.postToMainThread('resetTransform', NumericBoolean.FALSE, []);
  }

  rotate(angle: number) {
    this.postToMainThread('rotate', NumericBoolean.FALSE, [...arguments]);
  }

  transform(a: number, b: number, c: number, d: number, e: number, f: number) {
    this.postToMainThread('transform', NumericBoolean.FALSE, [...arguments]);
  }

  translate(x: number, y: number) {
    this.postToMainThread('translate', NumericBoolean.FALSE, [...arguments]);
  }

  scale(x: number, y: number) {
    this.postToMainThread('scale', NumericBoolean.FALSE, [...arguments]);
  }

  set globalAlpha(value: number) {
    this.postToMainThread('globalAlpha', NumericBoolean.TRUE, [...arguments]);
  }

  set globalCompositeOperation(value: string) {
    this.postToMainThread('globalCompositeOperation', NumericBoolean.TRUE, [...arguments]);
  }

  set imageSmoothingQuality(value: ImageSmoothingQuality) {
    this.postToMainThread('imageSmoothingQuality', NumericBoolean.TRUE, [...arguments]);
  }

  set fillStyle(value: string) {
    this.postToMainThread('fillStyle', NumericBoolean.TRUE, [...arguments]);
  }

  set strokeStyle(value: string) {
    this.postToMainThread('strokeStyle', NumericBoolean.TRUE, [...arguments]);
  }

  set shadowBlur(value: number) {
    this.postToMainThread('shadowBlur', NumericBoolean.TRUE, [...arguments]);
  }

  set shadowColor(value: string) {
    this.postToMainThread('shadowColor', NumericBoolean.TRUE, [...arguments]);
  }

  set shadowOffsetX(value: number) {
    this.postToMainThread('shadowOffsetX', NumericBoolean.TRUE, [...arguments]);
  }

  set shadowOffsetY(value: number) {
    this.postToMainThread('shadowOffsetY', NumericBoolean.TRUE, [...arguments]);
  }

  set filter(value: string) {
    this.postToMainThread('filter', NumericBoolean.TRUE, [...arguments]);
  }

  beginPath() {
    this.postToMainThread('beginPath', NumericBoolean.FALSE, []);
  }

  strokeText(text: string, x: number, y: number, maxWidth?: number) {
    this.postToMainThread('strokeText', NumericBoolean.FALSE, [...arguments]);
  }

  set textAlign(value: CanvasTextAlign) {
    this.postToMainThread('textAlign', NumericBoolean.TRUE, [...arguments]);
  }

  set textBaseline(value: CanvasTextBaseline) {
    this.postToMainThread('textBaseline', NumericBoolean.TRUE, [...arguments]);
  }

  set lineCap(value: CanvasLineCap) {
    this.postToMainThread('lineCap', NumericBoolean.TRUE, [...arguments]);
  }

  set lineDashOffset(value: number) {
    this.postToMainThread('lineDashOffset', NumericBoolean.TRUE, [...arguments]);
  }

  set lineJoin(value: CanvasLineJoin) {
    this.postToMainThread('lineJoin', NumericBoolean.TRUE, [...arguments]);
  }

  set miterLimit(value: number) {
    this.postToMainThread('miterLimit', NumericBoolean.TRUE, [...arguments]);
  }

  arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean) {
    this.postToMainThread('arc', NumericBoolean.FALSE, [...arguments]);
  }

  arcTo(x1: number, y1: number, x2: number, y2: number, radius: number) {
    this.postToMainThread('arcTo', NumericBoolean.FALSE, [...arguments]);
  }

  set direction(value: CanvasDirection) {
    this.postToMainThread('direction', NumericBoolean.TRUE, [...arguments]);
  }

  set font(value: string) {
    this.postToMainThread('font', NumericBoolean.TRUE, [...arguments]);
  }

  ellipse(x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, anticlockwise?: boolean) {
    this.postToMainThread('ellipse', NumericBoolean.FALSE, [...arguments]);
  }

  bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number) {
    this.postToMainThread('bezierCurveTo', NumericBoolean.FALSE, [...arguments]);
  }

  rect(x: number, y: number, width: number, height: number) {
    this.postToMainThread('rect', NumericBoolean.FALSE, [...arguments]);
  }

  quadraticCurveTo(cpx: number, cpy: number, x: number, y: number) {
    this.postToMainThread('quadraticCurveTo', NumericBoolean.FALSE, [...arguments]);
  }

  set imageSmoothingEnabled(value: boolean) {
    this.postToMainThread('imageSmoothingEnabled', NumericBoolean.TRUE, [...arguments]);
  }

  setLineDash(lineDash: number[]) {
    lineDash = [...lineDash];
    if (lineDash.length % 2 !== 0) {
      lineDash = lineDash.concat(lineDash);
    }
    this.lineDash = lineDash;
    this.postToMainThread('setLineDash', NumericBoolean.FALSE, lineDash);
  }

  getLineDash(): number[] {
    return [...this.lineDash];
  }

  clip(pathOrFillRule?: Path2D | CanvasFillRule, fillRule?: CanvasFillRule) {
    if (typeof pathOrFillRule === 'object') {
      throw new Error('clip(Path2D) is currently not supported!');
    }
    this.postToMainThread('clip', NumericBoolean.FALSE, [...arguments]);
  }

  fill(pathOrFillRule?: Path2D | CanvasFillRule, fillRule?: CanvasFillRule) {
    if (typeof pathOrFillRule === 'object') {
      throw new Error('fill(Path2D) is currently not supported!');
    }
    this.postToMainThread('fill', NumericBoolean.FALSE, [...arguments]);
  }

  // Method has a different signature in MDN than it does in HTML spec
  setTransform(transformOrA?: DOMMatrix2DInit | number, bOrC?: number, cOrD?: number, dOrE?: number, eOrF?: number, f?: number) {
    if (typeof transformOrA === 'object') {
      throw new Error('setTransform(DOMMatrix2DInit) is currently not supported!');
    }
    this.postToMainThread('setTransform', NumericBoolean.FALSE, [...arguments]);
  }

  ////////////////////////////////////////
  // The following methods require more to our transfer process:
  createLinearGradient(): CanvasGradient {
    return {} as CanvasGradient;
  }
  createPattern(): CanvasPattern {
    return {} as CanvasPattern;
  }
  createRadialGradient(): CanvasGradient {
    return {} as CanvasGradient;
  }

  // issue: has more than one signature, one with a Path2D arg
  isPointInPath(): boolean {
    return true;
  }

  // issue: has more than one signature, one with a Path2D arg
  isPointInStroke(): boolean {
    return true;
  }

  // issue: has a return value
  measureText(): TextMetrics {
    return {} as TextMetrics;
  }

  createImageData(): ImageData {
    return {} as ImageData;
  }
  getImageData(): ImageData {
    return {} as ImageData;
  }
  putImageData() {}

  // issue: has four signatures, all of them with a CanvasImageSource arg
  drawImage() {}
}
