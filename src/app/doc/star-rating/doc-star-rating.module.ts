import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {SidenavComponent} from './sidenav/sidenav.component';
import {DocStarRatingRoutingModule} from './doc-star-rating-routing.module';
import {SECTIONS} from './sections';
import {DocStarRatingComponent} from './doc-star-rating.component';
import {DemoStarRatingComponent} from './demo/demo-star-rating.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    DocStarRatingRoutingModule,
  ],
  exports: [],
  declarations: [
    DocStarRatingComponent,
    DemoStarRatingComponent,
    SECTIONS,
    SidenavComponent,
  ],
  providers: []
})
export class DocStarRatingModule {
}
