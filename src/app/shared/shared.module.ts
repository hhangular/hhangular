import {CommonModule} from '@angular/common';
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
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTreeModule
} from '@angular/material';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {PdfjsModule} from '../../../projects/pdfjs/src/lib/pdfjs.module';
import {StoreModule} from '../../../projects/store/src/public-api';
import {MarkdownModule} from 'ngx-markdown';
import {HttpClient} from '@angular/common/http';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {LayoutModule} from '@angular/cdk/layout';
import {SectionToolbarComponent} from './section-toolbar/section-toolbar.component';

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
];

@NgModule({
  imports: [
    CommonModule,
    MODULES,
    MarkdownModule.forRoot({loader: HttpClient}),
    PdfjsModule.config({workerSrc: 'assets/pdf.worker.js'}),
    StoreModule,
  ],
  exports: [
    MODULES,
    MarkdownModule,
    PdfjsModule,
    StoreModule,
    SectionToolbarComponent
  ],
  declarations: [SectionToolbarComponent],
  providers: [
//    {provide: USER_ID, useFactory: () => new BehaviorSubject<string>('ok')},
  ]
})
export class SharedModule {
}
