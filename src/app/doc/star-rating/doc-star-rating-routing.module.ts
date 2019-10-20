import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  OverviewComponent
} from './sections';
import {DocStarRatingComponent} from './doc-star-rating.component';
import {DemoStarRatingComponent} from './demo/demo-star-rating.component';

const docRoutes: Routes = [
  {
    path: '', component: DocStarRatingComponent, children: [
      {path: '', redirectTo: 'overview', pathMatch: 'full'},
      {path: 'overview', component: OverviewComponent},
      {path: 'demo', component: DemoStarRatingComponent},
    ]
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
export class DocStarRatingRoutingModule {
}
