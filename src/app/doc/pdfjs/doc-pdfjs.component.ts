import {Component, OnInit} from '@angular/core';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {GithubService} from "../../core/github.service";

@Component({
  templateUrl: './doc-pdfjs.component.html',
  styleUrls: ['./doc-pdfjs.component.css']
})
export class DocPdfjsComponent implements OnInit {

  faBars = faBars;

  version = '';

  constructor(private githubService: GithubService) {
  }

  public ngOnInit(): void {
    this.githubService.getPackageJson('/projects/pdfjs').subscribe(json => {
      this.version = json.version;
    });
  }
}
