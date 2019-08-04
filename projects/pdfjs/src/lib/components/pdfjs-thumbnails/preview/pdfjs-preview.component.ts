import {animate, state, style, transition, trigger} from '@angular/animations';
import {ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {debounceTime, filter} from 'rxjs/operators';
import {PreviewEvent, RenderQuality, ThumbnailLayout} from '../../../classes/pdfjs-objects';
import {PdfjsItem} from '../../../classes/pdfjs-item';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'pdfjs-preview',
  templateUrl: './pdfjs-preview.component.html',
  styleUrls: ['./pdfjs-preview.component.css'],
  animations: [
    trigger('previewState', [
      state('hidden', style({
        display: 'none',
        transform: 'scale(0)',
      })),
      state('visible', style({
        display: 'block',
        transform: 'scale(1)',
      })),
      transition('hidden => visible', animate('100ms ease-in')),
      transition('visible => hidden', animate('100ms ease-out')),
    ]),
  ],
})
export class PdfjsPreviewComponent implements OnInit {

  @HostBinding('@previewState')
  state = 'inactive';
  @Input()
  layout: ThumbnailLayout = ThumbnailLayout.HORIZONTAL;
  /**
   * Delay for show preview. 0 => disable preview
   */
  @Input()
  delay = 0;
  /**
   * Height of preview
   */
  @Input()
  height = 300;
  /**
   * Quality of preview
   */
  @Input()
  quality: RenderQuality = 2;
  item: PdfjsItem = null;
  private previewEvent$: BehaviorSubject<PreviewEvent> = new BehaviorSubject<PreviewEvent>(null);

  constructor(private elementRef: ElementRef) {
  }

  @Input()
  set previewEvent(event: PreviewEvent) {
    this.item = null;
    this.resetPreviewThumbnail();
    this.state = 'hidden';
    this.previewEvent$.next(event);
  }

  public ngOnInit(): void {
    this.previewEvent$.pipe(
      debounceTime(this.delay),
      filter(previewEvent => !!previewEvent)
    ).subscribe((previewEvent: PreviewEvent) => {
      this.item = previewEvent.item;
      if (!!previewEvent.item) {
        const caretSize = 10;
        if (this.layout === ThumbnailLayout.HORIZONTAL) {
          this.addVerticalCaret(previewEvent, caretSize);
        } else {
          this.addHorizontalCaret(previewEvent, caretSize);
        }
      }
    });
  }

  /**
   * The thumbnail is endRender, position it and show it
   */
  public endRenderHandler(item: PdfjsItem) {
    this.state = !!item ? 'visible' : 'hidden';
  }

  private addVerticalCaret(previewEvent: PreviewEvent, caretSize) {
    const previewThumbnail: HTMLElement = this.elementRef.nativeElement;
    const ratio = previewEvent.width / previewEvent.height;
    let cls = '';
    if (previewEvent.atTop) {
      cls = 'top';
      previewThumbnail.style.top = `${previewEvent.y - this.height - caretSize}px`;
//      previewThumbnail.style.paddingBottom = `${caretSize}px`;
    } else {
      cls = 'bottom';
      previewThumbnail.style.top = `${previewEvent.y + previewEvent.height}px`;
      previewThumbnail.style.paddingTop = `${caretSize}px`;
    }
    if (previewEvent.atLeft) {
      cls += '-left';
      previewThumbnail.style.left = `${previewEvent.x + previewEvent.width - (this.height * ratio)}px`;
    } else {
      cls += '-right';
      previewThumbnail.style.left = `${previewEvent.x}px`;
    }
    previewThumbnail.style.height = `${this.height + caretSize}px`;
    previewThumbnail.classList.add(cls);
  }

  private addHorizontalCaret(previewEvent: PreviewEvent, caretSize) {
    const previewThumbnail: HTMLElement = this.elementRef.nativeElement;
    const ratio = previewEvent.width / previewEvent.height;
    let cls = '';
    if (previewEvent.atLeft) {
      cls = 'left';
      const previewWidth = this.height * ratio;
      previewThumbnail.style.left = `${previewEvent.x - (previewWidth + caretSize)}px`;
      previewThumbnail.style.paddingRight = `${caretSize}px`;
    } else {
      cls = 'right';
      previewThumbnail.style.left = `${previewEvent.x + previewEvent.width}px`;
      previewThumbnail.style.paddingLeft = `${caretSize}px`;
    }
    if (previewEvent.atTop) {
      cls += '-top';
      previewThumbnail.style.top = `${previewEvent.y + previewEvent.height - this.height}px`;
    } else {
      cls += '-bottom';
      previewThumbnail.style.top = `${previewEvent.y}px`;
    }
    previewThumbnail.style.height = `${this.height}px`;
    previewThumbnail.classList.add(cls);
  }

  private resetPreviewThumbnail() {
    const previewThumbnail: HTMLElement = this.elementRef.nativeElement;
    previewThumbnail.classList.remove('right-top', 'left-top',
      'right-bottom', 'left-bottom',
      'top-left', 'top-right',
      'bottom-left', 'bottom-right');
    previewThumbnail.style.right = undefined;
    previewThumbnail.style.left = undefined;
    previewThumbnail.style.bottom = undefined;
    previewThumbnail.style.top = undefined;
    previewThumbnail.style.paddingBottom = '0px';
    previewThumbnail.style.paddingTop = '0px';
    previewThumbnail.style.paddingLeft = '0px';
    previewThumbnail.style.paddingRight = '0px';
  }
}

