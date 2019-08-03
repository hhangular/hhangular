import {SectionToolbarComponent} from './section-toolbar/section-toolbar.component';
import {RedirectComponent} from './redirect/redirect.component';
import {LocaleToLanguagePipe} from './locale-to-language/locale-to-language.pipe';
import {LocaleSelectorComponent} from './locale-selector/locale-selector.component';
import {NumberToStringPipe} from './number-to-string/number-to-string.pipe';

export const SHARED_COMPONENTS: any[] = [
  SectionToolbarComponent,
  RedirectComponent,
  LocaleSelectorComponent,
  LocaleToLanguagePipe,
  NumberToStringPipe
];

export {SectionToolbarComponent} from './section-toolbar/section-toolbar.component';
export {RedirectComponent} from './redirect/redirect.component';
export {LocaleSelectorComponent} from './locale-selector/locale-selector.component';
export {LocaleToLanguagePipe} from './locale-to-language/locale-to-language.pipe';
export {NumberToStringPipe} from './number-to-string/number-to-string.pipe';
