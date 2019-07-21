import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DocStoreComponent} from './doc-store.component';
import {OverviewComponent} from './sections';

const docRoutes: Routes = [
  {
    path: '', component: DocStoreComponent, children: [
      {path: '', redirectTo: 'overview', pathMatch: 'full'},
      {path: 'overview', component: OverviewComponent}]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(docRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DocStoreRoutingModule {
}
