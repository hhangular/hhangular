import {Component, OnInit} from '@angular/core';
import {
  faArrowsAlt, faBorderNone,
  faCogs, faDesktop,
  faDharmachakra,
  faDownload,
  faExpandArrowsAlt,
  faFilePdf as fasFilePdf, faGamepad, faListUl, faProjectDiagram, faWrench
} from '@fortawesome/free-solid-svg-icons';
import {faFilePdf as farFilePdf} from '@fortawesome/free-regular-svg-icons';
import {faBuromobelexperte} from '@fortawesome/free-brands-svg-icons';
import {GithubService} from "../../../core/github.service";

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
  faProjectDiagram = faProjectDiagram
  faBuromobelexperte = faBuromobelexperte;
  faArrowsAlt = faArrowsAlt;
  faExpandArrowsAlt = faExpandArrowsAlt;
  faBorderNone = faBorderNone;
  faGamepad = faGamepad;
  faWrench = faWrench;
  faListUl = faListUl;
  faDesktop = faDesktop;

}
