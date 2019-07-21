import {Component} from '@angular/core';
import {
  faArrowsAlt,
  faBorderNone,
  faCogs,
  faDesktop,
  faDharmachakra,
  faDownload,
  faExpandArrowsAlt,
  faFilePdf as fasFilePdf,
  faGamepad,
  faListUl,
  faProjectDiagram
} from '@fortawesome/free-solid-svg-icons';
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
  faDharmachakra = faDharmachakra;
  faProjectDiagram = faProjectDiagram;
  faArrowsAlt = faArrowsAlt;
  faExpandArrowsAlt = faExpandArrowsAlt;
  faBorderNone = faBorderNone;
  faGamepad = faGamepad;
  faListUl = faListUl;
  faDesktop = faDesktop;

}
