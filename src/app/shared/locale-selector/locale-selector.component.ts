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
    {path: '/en-US/', label: 'English US', devPort: 4201},
    {path: '/fr-FR/', label: 'Français', devPort: 4200}
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
    let origin = document.location.origin;
    if (origin.indexOf('localhost:') !== -1) { // only for dev environment
      origin = `http://localhost:${locale.devPort}`;
    }
    document.location.href = `${origin}${locale.path}`;
  }
}
