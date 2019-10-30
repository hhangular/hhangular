import {Component} from '@angular/core';
import {faDesktop, faDownload, faFlagCheckered, faStar} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['../../sidenav.scss'],
})
export class SidenavComponent {

  faStar = faStar;
  faDesktop = faDesktop;
  faFlagCheckered = faFlagCheckered;
  faDownload = faDownload;

}
