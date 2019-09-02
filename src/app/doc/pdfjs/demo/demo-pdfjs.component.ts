import {Component, OnInit} from '@angular/core';
import {PdfjsControl, PdfjsGroupControl, RenderEvent, RenderEventType, RenderQuality, ThumbnailDragMode, ThumbnailLayout, ViewFit} from '@hhangular/pdfjs';
import {
  faArrowLeft,
  faArrowRight,
  faArrowsAltH,
  faArrowsAltV,
  faEdit,
  faExpandArrowsAlt,
  faFilePdf,
  faMinus,
  faPlus,
  faSearchMinus,
  faSearchPlus,
  faSyncAlt,
  faUndo
} from '@fortawesome/free-solid-svg-icons';
import {faCopy, faFile} from '@fortawesome/free-regular-svg-icons';

@Component({
  templateUrl: './demo-pdfjs.component.html',
  styleUrls: ['./demo-pdfjs.component.css']
})
export class DemoPdfjsComponent implements OnInit {
  editMode = false;
  faCopy = faCopy;
  faUndo = faUndo;
  faArrowRight = faArrowRight;
  faArrowLeft = faArrowLeft;
  faFile = faFile;
  faSearchMinus = faSearchMinus;
  faSearchPlus = faSearchPlus;
  faExpandArrowsAlt = faExpandArrowsAlt;
  faArrowsAltV = faArrowsAltV;
  faArrowsAltH = faArrowsAltH;
  faSyncAlt = faSyncAlt;
  faEdit = faEdit;
  faFilePdf = faFilePdf;
  faPlus = faPlus;
  faMinus = faMinus;
  quality: RenderQuality = 2;
  textEnable = false;
  pdfs: { fn: string, url: string }[] = [
    {fn: 'condition.pdf', url: '../assets/pdfs/conditions.pdf'},
    {fn: 'guide.pdf', url: '../assets/pdfs/guide.pdf'},
    {fn: 'UnicodeStandard.pdf', url: '../assets/pdfs/UnicodeStandard.pdf'}
  ];
  pdfjsGroupControl: PdfjsGroupControl = new PdfjsGroupControl();
  pdfjsControl: PdfjsControl = new PdfjsControl();
  pdfjsControl1: PdfjsControl = new PdfjsControl();
  pdfjsControl2: PdfjsControl = new PdfjsControl();

  ThumbnailDragMode = ThumbnailDragMode;
  ThumbnailLayout = ThumbnailLayout;
  isNaN = isNaN;
  ViewFit = ViewFit;
  progress = 0;
  timeStart = 0;
  scale = 1;
  fit = ViewFit.VERTICAL;

  constructor() {
  }

  ngOnInit(): void {
    this.pdfjsControl.load('../assets/pdfs/guide.pdf', true);
    this.pdfjsGroupControl.selectControl(this.pdfjsControl);
  }

  showPdf($event: any) {
    this.pdfjsControl.load($event.url, true);
  }

  incQuality(by: number) {
    this.quality = (((this.quality + 4) + by) % 5) + 1 as RenderQuality;
  }

  renderHandler($event: RenderEvent) {
    this.progress = ($event.page / $event.pages) * 100;
    if ($event.type === RenderEventType.START) {
      this.timeStart = $event.time;
    } else if ($event.type === RenderEventType.END) {
      const time = $event.time - this.timeStart;
      const s = Math.trunc(time / 1000);
      const ms = time - s * 1000;
      console.log(`Render ${$event.pages} pages in ${s}s ${ms}ms`);
    }
  }

  changePageHandler(event: Event) {
    this.pdfjsGroupControl.selectPageIndex(parseInt((event.target as HTMLInputElement).value, 10));
  }
}
