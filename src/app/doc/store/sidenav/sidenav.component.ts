import {Component} from '@angular/core';
import {faArchive, faAt, faDesktop, faDownload, faExclamationTriangle, faFingerprint, faFlagCheckered, faProjectDiagram, faPuzzlePiece, faUserAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['../../sidenav.scss'],
})
export class SidenavComponent {

  faDownload = faDownload;
  faDesktop = faDesktop;
  faArchive = faArchive;
  faUser = faUserAlt;
  faFlagCheckered = faFlagCheckered;
  faExclamationTriangle = faExclamationTriangle;
  faProjectDiagram = faProjectDiagram;
  faFingerprint = faFingerprint;
  faPuzzlePiece = faPuzzlePiece;
  faAt = faAt;

}
