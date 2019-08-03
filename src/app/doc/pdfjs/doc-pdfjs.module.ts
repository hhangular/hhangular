import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DocPdfjsRoutingModule} from './doc-pdfjs-routing.module';
import {DocPdfjsComponent} from './doc-pdfjs.component';
import {SharedModule} from '../../shared/shared.module';
import {SidenavComponent} from './sidenav/sidenav.component';
import {SECTIONS} from './sections';
import {DemoPdfjsComponent} from './demo/demo-pdfjs.component';
import {MatProgressBarModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    DocPdfjsRoutingModule,
    MatProgressBarModule
  ],
  exports: [
  ],
  declarations: [
    DocPdfjsComponent,
    DemoPdfjsComponent,
    SECTIONS,
    SidenavComponent,
  ],
  providers: [  ]
})
export class DocPdfjsModule {}
