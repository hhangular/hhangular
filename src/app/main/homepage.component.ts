import {Component} from '@angular/core';
import {faAngular, faFontAwesome} from '@fortawesome/free-brands-svg-icons';

@Component({
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent {

  faFontAwesome = faFontAwesome;
  faAngular = faAngular;
}
