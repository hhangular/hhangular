import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LocalStored} from '@hhangular/store';
import {DOCUMENT} from '@angular/common';

@Component({
  template: '',
  styles: []
})
export class RedirectComponent implements OnInit {
  @LocalStored(1, 'APP_CONFIG')
  currentRoute = {route: '/main'};

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router
  ) {
  }

  ngOnInit() {
    const base: string = document.location.href;
    const referrer: string = document.referrer;
    const route: string = referrer.replace(base, '');
    this.router.navigate([route]).catch(e => {
      console.log(`Unknown route '${route}' redirection to '${this.currentRoute.route}'`);
      this.router.navigate([this.currentRoute.route]).then();
    });
  }

}
