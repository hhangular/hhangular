import {Component, Inject, Input} from '@angular/core';
import {faGlobe} from '@fortawesome/free-solid-svg-icons';
import {APP_BASE_HREF, DOCUMENT} from '@angular/common';
import {faCheckSquare, faSquare} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-locale-selector',
  templateUrl: './locale-selector.component.html',
  styles: []
})
export class LocaleSelectorComponent {
  faGlobe = faGlobe;
  faCheck = faCheckSquare;
  faUncheck = faSquare;

  @Input()
  locales: Locale[] = [
    {path: '/en-us/', label: 'English US', devPort: 4201},
    {path: '/fr-fr/', label: 'Français', devPort: 4200}
  ];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(APP_BASE_HREF) public baseHref: string,
  ) {
  }

  getIcon(path: string) {
    if (path === this.baseHref) {
      return this.faCheck;
    } else {
      return this.faUncheck;
    }
  }

  switchLocaleTo(locale: Locale) {
    if (locale.path === this.baseHref) {
      return;
    }
    if (document.location.href.indexOf('http://localhost:') === 0) { // only for dev environment
      document.location.href = document.location.href.replace(`:${document.location.port}${this.baseHref}`, `:${locale.devPort}${locale.path}`);
    } else {
      document.location.href = document.location.href.replace(`${this.baseHref}`, `${locale.path}`);
    }
  }
}
