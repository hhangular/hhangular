import {Component, OnInit} from '@angular/core';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {GithubService} from "../../core/github.service";
import {faNpm} from "@fortawesome/free-brands-svg-icons";

@Component({
  templateUrl: './doc-pdfjs.component.html',
  styleUrls: ['./doc-pdfjs.component.css']
})
export class DocPdfjsComponent implements OnInit {

  faBars = faBars;
  faNpm = faNpm;

  version = '';
  url = 'https://www.npmjs.com/package/@hhangular/pdfjs';

  constructor(private githubService: GithubService) {
  }

  public ngOnInit(): void {
    this.githubService.getPackageJson('/projects/pdfjs').subscribe(json => {
      this.version = json.version;
    });
  }
}
