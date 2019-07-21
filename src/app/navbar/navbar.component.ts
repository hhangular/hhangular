import {Component, OnInit} from '@angular/core';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import {GithubService} from '../core/github.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavBarComponent implements OnInit {

  faGithub = faGithub;

  url: string;

  constructor(private githubService: GithubService) {
  }

  public ngOnInit(): void {
    this.githubService.getPackageJson('').subscribe(json => {
      this.url = json.repository.url;
    });
  }
}
