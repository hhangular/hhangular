import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LocalStored} from '@hhangular/store';

@Component({
  template: '',
  styles: []
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
