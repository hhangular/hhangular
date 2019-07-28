import {Component} from '@angular/core';
import {faArchive, faBox, faCogs, faDesktop, faDownload, faFilePdf as fasFilePdf} from '@fortawesome/free-solid-svg-icons';
import {faFilePdf as farFilePdf, faUser} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {

  faDownload = faDownload;
  faCogs = faCogs;
  fasFilePdf = fasFilePdf;
  farFilePdf = farFilePdf;
  faDesktop = faDesktop;
  faArchive = faArchive;
  faBox = faBox;
  faUser = faUser;

}
