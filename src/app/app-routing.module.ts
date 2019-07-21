import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from './main/homepage.component';

const routes: Routes = [
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: 'main', component: HomepageComponent},
  {path: 'pdfjs', loadChildren: './doc/pdfjs/doc-pdfjs.module#DocPdfjsModule'},
  {path: 'store', loadChildren: './doc/store/doc-store.module#DocStoreModule'}
];

@NgModule({
  exports: [
    RouterModule,
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  declarations: [],
})
export class AppRoutingModule {
}
