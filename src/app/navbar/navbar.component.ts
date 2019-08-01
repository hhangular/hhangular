import {Component} from '@angular/core';
import {faAngular, faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavBarComponent {

  faAngular = faAngular;
  faGithub = faGithub;
  faLinkedin = faLinkedin;

  locales = [
    {path: '/en-US/', label: 'English US', devPort: 4201},
    {path: '/fr-FR/', label: 'Français', devPort: 4200}
  ];
}
