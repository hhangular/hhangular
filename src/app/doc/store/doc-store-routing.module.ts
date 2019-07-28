import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DocStoreComponent} from './doc-store.component';
import {InstallationComponent, UseComponent, OverviewComponent, UserManagementComponent} from './sections';

const docRoutes: Routes = [
    {
      path: '', component: DocStoreComponent, children: [
        {path: '', redirectTo: 'overview', pathMatch: 'full'},
        {path: 'overview', component: OverviewComponent},
        {path: 'install', component: InstallationComponent},
        {path: 'user-management', component: UserManagementComponent},
        {path: 'use', component: UseComponent},
        {path: 'demo', component: UseComponent}
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
