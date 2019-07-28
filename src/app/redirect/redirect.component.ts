import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LocalStored} from '../../../projects/store/src/public-api';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {
  @LocalStored(1, 'APP_CONFIG')
  currentRoute = {route: '/main'};

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    console.log(`Unknown path. redirection to ${this.currentRoute.route}`);
    this.router.navigate([this.currentRoute.route]).then();
  }

}
