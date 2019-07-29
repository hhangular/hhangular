import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  templateUrl: './overview.component.html',
  styleUrls: ['../../../section.scss']
})
export class OverviewComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  routeTo(event: any) {
    this.router.navigate([event.url], {relativeTo: this.route}).then();
  }
}
