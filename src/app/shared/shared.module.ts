import {APP_BASE_HREF, CommonModule, PlatformLocation} from '@angular/common';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatChipsModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatRadioModule,
  MatSidenavModule,
  MatSliderModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTreeModule
} from '@angular/material';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {PdfjsModule} from '@hhangular/pdfjs';
import {StoreModule} from '@hhangular/store';
import {MarkdownModule} from 'ngx-markdown';
import {HttpClient} from '@angular/common/http';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {LayoutModule} from '@angular/cdk/layout';
import {SHARED_COMPONENTS} from './index';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {StarRatingModule} from '@hhangular/star-rating';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

const MODULES: any[] = [
  FlexLayoutModule,
  MatTableModule,
  MatCheckboxModule,
  MatTabsModule,
  ScrollingModule,
  MatRadioModule,
  MatSliderModule,
  MatButtonModule,
  MatListModule,
  MatMenuModule,
  MatToolbarModule,
  MatSidenavModule,
  MatTreeModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  FontAwesomeModule,
  MatPaginatorModule,
  DragDropModule,
  MatChipsModule,
  LayoutModule,
  MatSortModule,
  MatProgressBarModule,
  MatSlideToggleModule
];

@NgModule({
  imports: [
    CommonModule,
    MODULES,
    MarkdownModule.forRoot({loader: HttpClient}),
    PdfjsModule.config({
      workerSrc: 'assets/pdf.worker.js',
      cMapUrl: 'assets/cmaps/',
      cMapPacked: true
    }),
    StoreModule,
  ],
  exports: [
    MODULES,
    MarkdownModule,
    PdfjsModule,
    StoreModule,
    StarRatingModule,
    SHARED_COMPONENTS,
  ],
  declarations: [
    SHARED_COMPONENTS,
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useFactory: (platformLocation: PlatformLocation) => platformLocation.getBaseHrefFromDOM(),
      deps: [PlatformLocation]
    },
//    {provide: USER_ID, useFactory: () => new BehaviorSubject<string>('ok')},
  ],
})
export class SharedModule {
}
