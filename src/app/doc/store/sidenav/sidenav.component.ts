import {Component} from '@angular/core';
import {faCogs, faDesktop, faDownload, faFilePdf as fasFilePdf} from '@fortawesome/free-solid-svg-icons';
import {faFilePdf as farFilePdf} from '@fortawesome/free-regular-svg-icons';

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

}
