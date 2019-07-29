import {Component, OnInit} from '@angular/core';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {faNpm} from '@fortawesome/free-brands-svg-icons';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  templateUrl: './doc-store.component.html',
  styleUrls: ['./doc-store.component.css']
})
export class DocStoreComponent implements OnInit {

  faBars = faBars;
  faNpm = faNpm;
  open = true;
  mode = 'side';

  url = 'https://www.npmjs.com/package/@hhangular/store';

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
