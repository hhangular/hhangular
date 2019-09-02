import {Component, OnInit} from '@angular/core';
import {PdfjsControl, PdfjsGroupControl, RenderQuality, ViewFit} from '@hhangular/pdfjs';

@Component({
  templateUrl: './pdfjsview.component.html',
  styleUrls: ['../../../../section.scss']
})
export class PdfjsViewComponent implements OnInit {

  groupControl: PdfjsGroupControl = new PdfjsGroupControl();
  conditionCtrl: PdfjsControl = new PdfjsControl();
  guideCtrl: PdfjsControl = new PdfjsControl();

  fit: ViewFit = ViewFit.VERTICAL;

  ViewFit = ViewFit;

  quality: RenderQuality = 2;

  textLayer = true;

  keysNav = true;

  mouseWheelNav = false;

  scale = 1;

  ngOnInit() {
    this.conditionCtrl.load('../assets/pdfs/conditions.pdf', true);
    this.guideCtrl.load('../assets/pdfs/guide.pdf', true);
    this.groupControl.selectControl(this.guideCtrl);
  }

}
