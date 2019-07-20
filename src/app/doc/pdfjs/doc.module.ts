import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DocRoutingModule} from './doc-routing.module';
import {DocPdfjsComponent} from './doc-pdfjs.component';
import {SharedModule} from '../../shared/shared.module';
import {SidenavComponent} from './sidenav/sidenav.component';
import {SECTIONS} from './sections';
import {DemoPdfjsComponent} from './demo/demo-pdfjs.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    DocRoutingModule
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
export class DocModule {}
