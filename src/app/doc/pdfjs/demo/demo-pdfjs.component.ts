import {Component, OnInit} from '@angular/core';
import {PdfjsControl} from '../../../../../projects/pdfjs/src/lib/controls/pdfjs-control';
import {RenderQuality, ThumbnailDragMode, ThumbnailLayout, ViewFit} from '../../../../../projects/pdfjs/src/lib/classes/pdfjs-objects';
import {PdfjsGroupControl} from '../../../../../projects/pdfjs/src/lib/controls/pdfjs-group-control';
import {faArrowLeft, faArrowRight, faEdit, faExpandArrowsAlt, faFilePdf, faMinus, faPlus, faSearchMinus, faSearchPlus, faSyncAlt, faUndo} from '@fortawesome/free-solid-svg-icons';
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
  faSyncAlt = faSyncAlt;
  faEdit = faEdit;
  faFilePdf = faFilePdf;
  faPlus = faPlus;
  faMinus = faMinus;
  quality: RenderQuality = 2;
  textEnable = false;
  pdfs: any[] = [
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
  ViewFit = ViewFit;

  scale = 1;

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
}
