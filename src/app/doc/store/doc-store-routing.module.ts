import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DocStoreComponent} from './doc-store.component';
import {InstallationComponent, UseComponent, OverviewComponent, UserMngmtComponent} from './sections';
import {DemoStoreComponent} from './demo/demo-store.component';

const docRoutes: Routes = [
    {
      path: '', component: DocStoreComponent, children: [
        {path: '', redirectTo: 'overview', pathMatch: 'full'},
        {path: 'overview', component: OverviewComponent},
        {path: 'install', component: InstallationComponent},
        {path: 'user-mngmt', component: UserMngmtComponent},
        {path: 'use', component: UseComponent},
        {path: 'demo', component: DemoStoreComponent}
      ]
    }
  ]
;

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
