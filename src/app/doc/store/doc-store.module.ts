import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {SidenavComponent} from './sidenav/sidenav.component';
import {DocStoreRoutingModule} from './doc-store-routing.module';
import {DocStoreComponent} from './doc-store.component';
import {SECTIONS} from './sections';
import {DemoStoreComponent} from './demo/demo-store.component';
import {MatSortModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    DocStoreRoutingModule,
    MatSortModule,
  ],
  exports: [],
  declarations: [
    SECTIONS,
    SidenavComponent,
    DocStoreComponent,
    DemoStoreComponent
  ],
  providers: []
})
export class DocStoreModule {
}
