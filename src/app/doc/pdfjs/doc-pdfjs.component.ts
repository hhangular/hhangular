import {Component, OnInit} from '@angular/core';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {faNpm} from '@fortawesome/free-brands-svg-icons';

@Component({
  templateUrl: './doc-pdfjs.component.html',
  styleUrls: ['./doc-pdfjs.component.css']
})
export class DocPdfjsComponent implements OnInit {

  faBars = faBars;
  faNpm = faNpm;

  url = 'https://www.npmjs.com/package/@hhangular/pdfjs';

  constructor() {
  }

  public ngOnInit(): void {
  }
}
