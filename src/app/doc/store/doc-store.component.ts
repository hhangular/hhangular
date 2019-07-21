import {Component, OnInit} from '@angular/core';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {faNpm} from '@fortawesome/free-brands-svg-icons';

@Component({
  templateUrl: './doc-store.component.html',
  styleUrls: ['./doc-store.component.css']
})
export class DocStoreComponent implements OnInit {

  faBars = faBars;
  faNpm = faNpm;

  url = 'https://www.npmjs.com/package/@hhangular/pdfjs';

  constructor() {
  }

  public ngOnInit(): void {
  }
}
