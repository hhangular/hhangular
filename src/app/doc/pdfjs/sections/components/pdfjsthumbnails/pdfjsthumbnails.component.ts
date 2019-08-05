import {Component, OnInit} from '@angular/core';
import {
  PdfjsControl,
  RenderEvent,
  RenderQuality,
  ThumbnailDragMode,
  ThumbnailLayout
} from '../../../../../../../projects/pdfjs/src/public-api';
import {LocalStored} from '../../../../../../../projects/store/src/public-api';

@Component({
  templateUrl: './pdfjsthumbnails.component.html',
  styleUrls: ['../../../../section.scss']
})
export class PdfjsThumbnailsComponent implements OnInit {

  conditionCtrl1: PdfjsControl = new PdfjsControl();
  conditionCtrl2: PdfjsControl = new PdfjsControl();
  conditionCtrl3: PdfjsControl = new PdfjsControl();
  conditionCtrl4: PdfjsControl = new PdfjsControl();
  conditionCtrl5: PdfjsControl = new PdfjsControl();
  guideCtrl1: PdfjsControl = new PdfjsControl();
  guideCtrl2: PdfjsControl = new PdfjsControl();

  ThumbnailLayout = ThumbnailLayout;
  ThumbnailDragMode = ThumbnailDragMode;

  @LocalStored(1)
  config = {
    quality: 1
  };
  allowRemove = true;
  allowDrop = true;
  dragMode = ThumbnailDragMode.DUPLICATE;
  fitSize = 100;
  previewDelay = 100;
  previewHeight = 300;
  previewQuality: RenderQuality = 2;
  layout = ThumbnailLayout.HORIZONTAL;
  borderWidth = 5;

  consoleLog = '';
  progress = 0;
  timeStart = 0;

  renderEndEvent: RenderEvent;

  startTime = 0;
  endTime = 0;

  ngOnInit() {
    this.guideCtrl1.load('../assets/pdfs/guide.pdf', true);
    this.guideCtrl2.load('../assets/pdfs/guide.pdf', true);
    this.conditionCtrl1.load('../assets/pdfs/conditions.pdf', true);
    this.conditionCtrl2.load('../assets/pdfs/conditions.pdf', true);
    this.conditionCtrl3.load('../assets/pdfs/conditions.pdf', true);
    this.conditionCtrl4.load('../assets/pdfs/conditions.pdf', true);
    this.conditionCtrl5.load('../assets/pdfs/conditions.pdf', true);
  }

  renderEvent($event: RenderEvent) {
    if ($event.type === 'START') {
      this.startTime = $event.time;
    } else if ($event.type === 'END') {
      this.renderEndEvent = $event;
      this.endTime = $event.time - this.startTime;
    }
  }

  renderHandler($event: RenderEvent) {
    this.consoleLog += `${JSON.stringify($event)}   \n`;
    this.progress = ($event.page / $event.pages) * 100;
    if ($event.type === 'START') {
      this.timeStart = $event.time;
    } else if ($event.type === 'END') {
      const time = $event.time - this.timeStart;
      const s = Math.trunc(time / 1000);
      const ms = time - s * 1000;
      this.consoleLog += `Render ${$event.pages} pages in ${s}s ${ms}ms   \n`;
    }
  }
}
