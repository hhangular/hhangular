import {Component, OnInit} from '@angular/core';
import {PdfjsControl, RenderQuality, ViewFit} from '../../../../../../../projects/pdfjs/src/public-api';

@Component({
  templateUrl: './pdfjsview.component.html',
  styleUrls: ['../../../../section.scss']
})
export class PdfjsViewComponent implements OnInit {

  conditionCtrl: PdfjsControl = new PdfjsControl();

  fit: ViewFit = ViewFit.VERTICAL;

  ViewFit = ViewFit;

  quality: RenderQuality = 2;

  textLayer = true;

  keysNav = true;

  mouseWheelNav = false;

  scale = 1;

  ngOnInit() {
    this.conditionCtrl.load('../assets/pdfs/conditions.pdf', true);
  }

}
