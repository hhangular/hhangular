import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.navigate(this.getExpectedRoute(document.location.origin, document.referrer)).then(); // 'https:/hhangular.hhdev.fr', 'https:/hhangular.hhdev.fr/en-us/pdfjs/overview'
  }

  public getExpectedRoute(base: string, referrer: string): string {
    const re: RegExp = new RegExp(`^${base}/\\w\\w-\\w\\w/`);
    return referrer.replace(re, ''); // pdfjs/overview
  }

  public navigate(route: string): Promise<boolean | void> {
    return this.router.navigate([route])
      .catch(e => {
        console.log(`Unknown route '${route}' redirection to '${this.currentRoute.route}'`, this.route.data);
        this.router.navigate([this.currentRoute.route]).then();
      });
  }

}
