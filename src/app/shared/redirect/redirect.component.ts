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
    if (!!this.document) {
      try {
        this.navigate(this.getExpectedRoute(this.document.location.origin, this.document.referrer)).then(); // 'https:/hhangular.hhdev.fr', 'https:/hhangular.hhdev.fr/en-us/pdfjs/overview'
      } catch (e) {
        this.navigateToMain();
      }
    }
  }

  public getExpectedRoute(base: string, referrer: string): string {
    const re: RegExp = new RegExp(`^${base}/\\w\\w-\\w\\w/`);
    const route = referrer.replace(re, ''); // pdfjs/overview
    return route;
  }

  public navigate(route: string): Promise<boolean | void> {
    return this.router.navigate([route]).catch(e => this.navigateToMain());
  }

  public navigateToMain() {
    this.router.navigate([this.currentRoute.route]).then();
  }

}
