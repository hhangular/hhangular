import {Component, OnInit} from '@angular/core';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  templateUrl: './doc-pdfjs.component.html',
  styleUrls: ['../doc.scss']
})
export class DocPdfjsComponent implements OnInit {

  faBars = faBars;
  open = true;
  mode: 'over' | 'push' | 'side' = 'side';

  constructor(private breakpointObserver: BreakpointObserver) {
  }

  public ngOnInit(): void {
    this.breakpointObserver.observe('(max-width: 599px)')
      .subscribe(result => {
        this.open = !result.matches;
        this.mode = result.matches ? 'over' : 'side';
      });
  }
}
