import {Component, Inject} from '@angular/core';
import {faGlobe} from '@fortawesome/free-solid-svg-icons';
import {APP_BASE_HREF, DOCUMENT} from '@angular/common';
import {faCheckSquare, faSquare} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-locale-selector',
  templateUrl: './locale-selector.component.html',
  styleUrls: ['./locale-selector.component.scss']
})
export class LocaleSelectorComponent {
  faGlobe = faGlobe;
  faCheck = faCheckSquare;
  faUncheck = faSquare;

  currentLocale = 'fr-FR';

  locales = [
    {path: '/en-US/', label: 'English US'},
    {path: '/fr-FR/', label: 'Français'}
  ];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(APP_BASE_HREF) private baseHref: string,
  ) {
  }

  getIcon(path: string) {
    if (path === this.baseHref) {
      return this.faCheck;
    } else {
      return this.faUncheck;
    }
  }

  switchLocaleTo(path: string) {
    if (path === this.baseHref) {
      return;
    }
    this.currentLocale = path;
    let origin = document.location.origin;
    if (origin.indexOf('localhost:420') !== -1) { // only for dev environment
      if (path === '/fr-FR/') {
        origin = 'http://localhost:4200';
      } else if (path === '/en-US/') {
        origin = 'http://localhost:4201';
      }
    }
    document.location.href = `${origin}${path}`;
  }
}
