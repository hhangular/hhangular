import { NgModule } from '@angular/core';
import { StarRatingComponent } from './star-rating.component';
import {StarEmptyComponent} from './stars/star-empty.component';
import {StarHalfComponent} from './stars/star-half.component';
import {StarFullyComponent} from './stars/star-fully.component';
import {CommonModule} from '@angular/common';



@NgModule({
  declarations: [StarRatingComponent, StarEmptyComponent, StarHalfComponent, StarFullyComponent],
  imports: [
    CommonModule
  ],
  exports: [StarRatingComponent]
})
export class StarRatingModule { }
