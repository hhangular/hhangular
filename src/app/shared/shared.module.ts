import {ScrollingModule} from '@angular/cdk/scrolling';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatRadioModule,
  MatSidenavModule,
  MatSliderModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTreeModule
} from '@angular/material';
import {NgxMdModule} from 'ngx-md';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {PdfjsModule} from '../../../projects/pdfjs/src/lib/pdfjs.module';

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
];

@NgModule({
  imports: [
    CommonModule,
    MODULES,
    NgxMdModule.forRoot(),
    PdfjsModule.config({workerSrc: 'assets/pdf.worker.js'}),
  ],
  exports: [
    MODULES,
    NgxMdModule,
    PdfjsModule,
  ],
  declarations: [],
})
export class SharedModule {
}
