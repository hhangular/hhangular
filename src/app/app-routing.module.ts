import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NavigationEnd, Router, RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from './main/homepage.component';
import {filter} from 'rxjs/operators';
import {LocalStored} from '@hhangular/store';
import {SharedModule} from './shared/shared.module';
import {RedirectComponent} from './shared';

const routes: Routes = [
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: 'main', component: HomepageComponent},
  {path: 'pdfjs', loadChildren: './doc/pdfjs/doc-pdfjs.module#DocPdfjsModule'},
  {path: 'store', loadChildren: './doc/store/doc-store.module#DocStoreModule'},
  {path: 'star-rating', loadChildren: './doc/star-rating/doc-star-rating.module#DocStarRatingModule'},
  {path: '**', component: RedirectComponent},
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    SharedModule
  ],
  declarations: [],
})
export class AppRoutingModule {
  @LocalStored(1, 'APP_CONFIG')
  currentRoute = {route: '/main'};


  constructor(
    private router: Router
  ) {
    this.surveyAndSaveLastSuccessRoute();
  }

  surveyAndSaveLastSuccessRoute() {
    this.router.events.pipe(
      filter((event: any) => {
        return !!event.urlAfterRedirects && !event.state;
      })
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute.route = event.urlAfterRedirects;
    });
  }
}
