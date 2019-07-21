import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {SidenavComponent} from './sidenav/sidenav.component';
import {SECTIONS} from './sections';
import {DocStoreRoutingModule} from './doc-store-routing.module';
import {DocStoreComponent} from './doc-store.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    DocStoreRoutingModule,
  ],
  exports: [],
  declarations: [
    SECTIONS,
    SidenavComponent,
    DocStoreComponent,
  ],
  providers: []
})
export class DocStoreModule {
}
