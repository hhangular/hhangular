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
    console.log('In redirect.component.ts : ngOnInit() : ', document.location, document.referrer);
    this.navigate(this.getExpectedRoute(document.location.origin, document.referrer)).then(); // 'https:/hhangular.hhdev.fr', 'https:/hhangular.hhdev.fr/en-us/pdfjs/overview'
  }

  public getExpectedRoute(base: string, referrer: string): string {
    console.log('In redirect.component.ts : getExpectedRoute(base, referrer) : arguments', base, referrer);
    const re: RegExp = new RegExp(`^${base}/\\w\\w-\\w\\w/`);
    const route = referrer.replace(re, ''); // pdfjs/overview
    console.log('In redirect.component.ts : getExpectedRoute(base, referrer) : route', route);
    return route;
  }

  public navigate(route: string): Promise<boolean | void> {
    console.log('In redirect.component.ts : navigate(route) : arguments', route);
    return this.router.navigate([route])
      .catch(e => {
        console.log(`Unknown route '${route}' redirection to '${this.currentRoute.route}'`, this.route.data);
        this.router.navigate([this.currentRoute.route]).then();
      });
  }

}
