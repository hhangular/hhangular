import {Component} from '@angular/core';

@Component({
  templateUrl: './demo-star-rating.component.html',
  styleUrls: ['./demo-star-rating.component.css']
})
export class DemoStarRatingComponent {

  sizes = ['xs', 'sm', null, '1x', 'lg', '2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x', '10x'];
  colors = ['pink', 'red', 'green', 'bleue', 'orange', 'yellow'];

  getLabelSize: (value: number) => string = (value: number) => {
    return `${this.sizes[value]}`;
  }
  getLabelColor: (value: number) => string = (value: number) => {
    return `${this.colors[value]}`;
  }
}
